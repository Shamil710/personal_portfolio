import express from "express";
import nodemailer from "nodemailer";
import Comment from "../models/comment.js";

const router = express.Router();

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

/** Mask email for privacy: user****@gmail.com */
function maskEmail(email) {
  if (!email || !email.includes("@")) return "";
  const [user, domain] = email.split("@");
  const visible = user.slice(0, Math.min(4, user.length));
  return `${visible}****@${domain}`;
}

/** Basic email format check */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendCommentEmail({ name, email, message }) {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();

  if (!emailUser || !emailPass) {
    console.warn(
      "EMAIL_USER or EMAIL_PASS is not set; skipping email notification.",
    );
    return;
  }

  const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const safeMessageHtml = safeMessage.replace(/\n/g, "<br>");
  const submittedAt = new Date();
  const submittedAtText = submittedAt.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  await mailer.sendMail({
    from: `Portfolio Contact <${emailUser}>`,
    to: emailUser,
    replyTo: email,
    subject: `🚀 New Portfolio Contact: ${name}`,
    text: [
      "New Portfolio Contact",
      "",
      `Submitted: ${submittedAtText}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "This message was sent from your portfolio website.",
    ].join("\n"),
    html: `
      <div style="margin:0;padding:24px 12px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#18181b;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;padding:24px;">
          <h2 style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#111827;">New Portfolio Contact</h2>
          <p style="margin:0 0 20px;color:#52525b;font-size:14px;">Submitted: ${escapeHtml(submittedAtText)}</p>

          <p style="margin:0 0 10px;font-size:15px;"><strong style="color:#111827;">Name:</strong> ${safeName}</p>
          <p style="margin:0 0 18px;font-size:15px;"><strong style="color:#111827;">Email:</strong> ${safeEmail}</p>

          <div style="margin:0 0 18px;padding:14px;border:1px solid #e4e4e7;border-radius:10px;background:#fafafa;">
            <p style="margin:0 0 8px;font-size:14px;color:#3f3f46;"><strong style="color:#111827;">Message</strong></p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#18181b;">${safeMessageHtml}</p>
          </div>

          <p style="margin:0;padding-top:14px;border-top:1px solid #e4e4e7;color:#71717a;font-size:13px;">
            This message was sent from your portfolio website.
          </p>
        </div>
      </div>
    `,
  });
}

/* ─────────────────────────────────────────────
   GET /api/comments
   Returns latest 6 comments, newest first.
   Email is masked before sending to client.
───────────────────────────────────────────── */
router.get("/", async (_req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // Mask email before sending — never expose raw email
    const safe = comments.map(({ email, ...rest }) => ({
      ...rest,
      emailMasked: maskEmail(email),
    }));

    res.json(safe);
  } catch (err) {
    console.error("GET /comments error:", err.message);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/* ─────────────────────────────────────────────
   POST /api/comments
   Validates name, email, message then saves.
───────────────────────────────────────────── */
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // ── Field presence ──
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are all required." });
  }

  // ── Email format ──
  if (!EMAIL_RE.test(email.trim())) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  // ── Min lengths ──
  if (name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters." });
  }
  if (message.trim().length < 5) {
    return res
      .status(400)
      .json({ error: "Message must be at least 5 characters." });
  }

  // ── Max length (guard even if schema validates) ──
  if (message.trim().length > 400) {
    return res
      .status(400)
      .json({ error: "Message cannot exceed 400 characters." });
  }

  try {
    const comment = await Comment.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    sendCommentEmail(comment).catch((err) => {
      console.error("Email notification failed:", err.message);
    });

    // Return the saved doc with masked email
    const { email: _raw, ...rest } = comment.toObject();
    res.status(201).json({ ...rest, emailMasked: maskEmail(_raw) });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(". ") });
    }
    console.error("POST /comments error:", err.message);
    res.status(500).json({ error: "Failed to save comment. Try again." });
  }
});

/* ─────────────────────────────────────────────
   DELETE /api/comments/:id  (admin only)
───────────────────────────────────────────── */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Comment not found." });
    res.json({ message: "Deleted successfully." });
  } catch (err) {
    console.error("DELETE /comments error:", err.message);
    res.status(500).json({ error: "Failed to delete comment." });
  }
});

export default router;
