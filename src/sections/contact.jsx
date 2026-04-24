import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
} from "../utils/animationVariants";
import { useScrollReveal } from "../hooks/useScrollReveal";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

/* ─────────────────────────────────────────────
   Utility helpers
───────────────────────────────────────────── */

/** "Just now" / "5 minutes ago" / "2 days ago" */
function timeAgo(iso) {
  if (!iso) return "";
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000); // seconds
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Deterministic gradient from first char of name */
function avatarGradient(name) {
  const gradients = [
    "linear-gradient(135deg, #5b7fff 0%, #818cf8 100%)", // blue-violet
    "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", // violet-pink
    "linear-gradient(135deg, #38bdf8 0%, #34d399 100%)", // cyan-green
    "linear-gradient(135deg, #fb923c 0%, #f87171 100%)", // orange-red
    "linear-gradient(135deg, #34d399 0%, #5b7fff 100%)", // green-blue
    "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)", // amber-pink
    "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)", // violet-cyan
    "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)", // pink-amber
  ];
  const code = (name?.charCodeAt(0) || 65) + (name?.charCodeAt(1) || 0);
  return gradients[code % gradients.length];
}

/** Front-end email validator */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─────────────────────────────────────────────
   Avatar component
───────────────────────────────────────────── */
function Avatar({ name }) {
  const initial = (name || "?")[0].toUpperCase();
  const grad = avatarGradient(name);
  return (
    <div className="cw-avatar" style={{ background: grad }}>
      <span className="cw-avatar-letter">{initial}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Comment Card
───────────────────────────────────────────── */
function CommentCard({ c }) {
  const [expanded, setExpanded] = useState(false);
  const maxPreviewChars = 115;
  const rawMessage = c.message || "";
  const isLongMessage = rawMessage.length > maxPreviewChars;
  const previewMessage = isLongMessage
    ? `${rawMessage.slice(0, maxPreviewChars).trimEnd()}...`
    : rawMessage;
  const displayMessage =
    expanded || !isLongMessage ? rawMessage : previewMessage;

  return (
    <Motion.div
      className="cw-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hoverLift}
    >
      {/* Gradient top-line revealed on hover via CSS */}
      <div className="cw-card-accent" />

      {/* Header row */}
      <div className="cw-card-top">
        <Avatar name={c.name} />
        <div className="cw-meta">
          <span className="cw-name">{c.name}</span>
          <span className="cw-time">{timeAgo(c.createdAt)}</span>
        </div>
      </div>

      {/* Message body */}
      <div
        className={`cw-message-wrap ${expanded ? "is-expanded" : ""} ${isLongMessage ? "is-truncatable" : ""}`}
      >
        <p className="cw-message">{displayMessage}</p>
        {!expanded && isLongMessage && <span className="cw-message-fade" />}
      </div>

      {isLongMessage && (
        <button
          type="button"
          className="cw-toggle-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less ↑" : "Read more →"}
        </button>
      )}

      {/* Footer: masked email */}
      {c.emailMasked && (
        <div className="cw-card-footer">
          <span className="cw-email-masked">{c.emailMasked}</span>
        </div>
      )}
    </Motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Contact section
───────────────────────────────────────────── */
function Contact() {
  const { ref: scrollRef, inView } = useScrollReveal(0.1);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [charLeft, setCharLeft] = useState(400);

  /* Fetch latest 6 comments */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comments`);
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch {
        setComments([]);
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    if (name === "message") setCharLeft(400 - value.length);
  };

  /* ── Front-end validation ── */
  const validate = () => {
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim())
      return "Please fill in all fields.";
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!EMAIL_RE.test(email.trim()))
      return "Please enter a valid email address.";
    if (message.trim().length < 5)
      return "Message must be at least 5 characters.";
    if (message.trim().length > 400)
      return "Message cannot exceed 400 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        setError(msg || "Something went wrong. Try again.");
        return;
      }

      const newComment = await res.json();
      // Keep wall at max 6 from top
      setComments((prev) => [newComment, ...prev].slice(0, 6));
      setForm({ name: "", email: "", message: "" });
      setCharLeft(400);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
    } catch {
      setError("Could not reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    {
      label: "Email",
      value: "ubyshamil@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&to=ubyshamil@gmail.com&subject=Portfolio Contact",
      icon: "✉",
      tag: "Direct mail",
    },
    {
      label: "GitHub",
      value: "github.com/shamil710",
      href: "https://github.com/shamil710",
      icon: "◉",
      tag: "Open source",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/shamil-j",
      href: "https://www.linkedin.com/in/shamil-j/",
      icon: "◈",
      tag: "Professional",
    },
  ];

  return (
    <section id="contact" className="contact" ref={scrollRef}>
      <div className="contact-orb" aria-hidden="true" />

      <Motion.div
        className="contact-inner"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* ── HEADER ── */}
        <Motion.div className="contact-header" variants={staggerContainer}>
          <Motion.div className="section-label" variants={slideInLeft}>
            <span className="label-line" />
            <span className="label-mono">// 04 — CONTACT</span>
          </Motion.div>
          <Motion.h2 className="contact-heading" variants={slideInLeft}>
            Let&apos;s <span className="gradient-word">Connect</span>
          </Motion.h2>
          <Motion.p className="contact-sub" variants={fadeUp}>
            Open to new opportunities, collaborations, or just a friendly chat.
          </Motion.p>
        </Motion.div>

        {/* ── TOP GRID ── */}
        <Motion.div
          className="contact-top"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* LEFT — links */}
          <Motion.div
            className="contact-links-col"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="contact-links-label">Reach me at</p>
            <Motion.div
              className="contact-links"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {contactLinks.map((link) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link-card"
                  variants={staggerItem}
                  whileHover={hoverScale}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="clc-icon-wrap">
                    <span className="clc-icon">{link.icon}</span>
                  </div>
                  <div className="clc-info">
                    <span className="clc-label">{link.label}</span>
                    <span className="clc-value">{link.value}</span>
                  </div>
                  <span className="clc-tag">{link.tag}</span>
                  <span className="clc-arrow">→</span>
                </Motion.a>
              ))}
            </Motion.div>
            <Motion.div
              className="contact-status"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="cs-dot" />
              <div className="cs-text">
                <span className="cs-title">Available for work</span>
                <span className="cs-desc">
                  Open to full-time or freelance roles
                </span>
              </div>
            </Motion.div>
          </Motion.div>

          {/* RIGHT — form */}
          <Motion.div
            className="contact-form-col"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Motion.div
              className="contact-form-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-card-header">
                <span className="form-card-title">Send a Message</span>
                <span className="form-card-sub">
                  I&apos;ll reply within 24 hours
                </span>
              </div>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <Motion.div
                  className="form-group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="form-label" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Eg. John Doe"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={loading}
                    maxLength={60}
                  />
                </Motion.div>

                <Motion.div
                  className="form-group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <label className="form-label" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Eg. your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={loading}
                  />
                </Motion.div>

                <Motion.div
                  className="form-group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="form-label-row">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <span
                      className={`form-char-count ${charLeft < 20 ? "form-char-warn" : ""}`}
                    >
                      {charLeft} left
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Your message, project idea, or just say hi…"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={400}
                  />
                </Motion.div>

                {error && (
                  <Motion.div
                    className="form-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>⚠</span> {error}
                  </Motion.div>
                )}

                <Motion.button
                  type="submit"
                  className="form-submit"
                  whileHover={hoverScale}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" /> Sending…
                    </>
                  ) : submitted ? (
                    <>✓ Message sent!</>
                  ) : (
                    <>
                      Send Message <span className="btn-arrow-inline">→</span>
                    </>
                  )}
                </Motion.button>
              </form>
            </Motion.div>
          </Motion.div>
        </Motion.div>

        {/* ── COMMUNITY WALL ── */}
        <Motion.div
          className="comment-wall"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="cw-header">
            <div className="cw-title-row">
              <span className="cw-title">Community Wall</span>
              {!fetching && (
                <span className="cw-count">
                  {comments.length}{" "}
                  {comments.length === 1 ? "message" : "messages"}
                </span>
              )}
            </div>
            <p className="cw-desc">
              Messages from people who stopped by — yours will appear here too.
            </p>
          </div>

          {fetching ? (
            <div className="cw-empty">
              <div className="cw-loading-dots">
                <span />
                <span />
                <span />
              </div>
              <p>Loading messages…</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="cw-empty">
              <span className="cw-empty-icon">🚀</span>
              <p className="cw-empty-title">Be the first to leave a message</p>
              <p className="cw-empty-sub">
                Fill the form above — your message will appear here.
              </p>
            </div>
          ) : (
            <Motion.div
              className="cw-grid"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {comments.map((c) => (
                <CommentCard key={c._id} c={c} />
              ))}
            </Motion.div>
          )}
        </Motion.div>

        {/* ── FOOTER ── */}
        <Motion.div
          className="contact-footer"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="cf-line" />
          <span className="cf-text">
            Designed &amp; built by{" "}
            <span className="gradient-word">Shamil</span> ·{" "}
            {new Date().getFullYear()}
          </span>
          <div className="cf-line" />
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default Contact;
