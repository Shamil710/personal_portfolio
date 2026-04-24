import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  staggerContainer,
  staggerItem,
  hoverScale,
} from "../utils/animationVariants";
import { useScrollReveal } from "../hooks/useScrollReveal";

/* ─────────────────────────────────────────────
   GOVSCHEME MOCKUP — animated browser preview
───────────────────────────────────────────── */
function GovMockup() {
  const stats = [
    { num: "450+", label: "Active Schemes" },
    { num: "36", label: "States" },
    { num: "12", label: "Categories" },
    { num: "2M+", label: "Citizens" },
  ];
  return (
    <Motion.div
      className="project-mockup"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Motion.div
        className="browser-frame mockup-float"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="browser-bar">
          <div className="browser-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-url">smart-scheme-recommender.vercel.app</div>
        </div>
        <div className="browser-screen gov-screen">
          <div className="gov-nav">
            <span className="gov-logo">GS GovScheme</span>
            <div className="gov-nav-links">
              <span>Home</span>
              <span className="gov-active">Explore</span>
              <span>Dashboard</span>
              <span>Check Eligibility</span>
            </div>
          </div>
          <div className="screen-hero">
            <div className="sh-badge">◉ 450+ Government Schemes Available</div>
            <div className="sh-title">Find Government Schemes</div>
            <div className="sh-subtitle gradient-word">
              You&apos;re Eligible For
            </div>
            <div className="sh-btns">
              <span className="sh-btn-primary">Check My Eligibility</span>
              <span className="sh-btn-secondary">Explore All</span>
            </div>
            <div className="sh-stats">
              {stats.map(({ num, label }) => (
                <div key={label} className="sh-stat">
                  <span className="sh-stat-num">{num}</span>
                  <span className="sh-stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Motion.div>
      {/* Floating chips */}
      <Motion.div
        className="mockup-chip chip-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>◈</span> Admin Dashboard
      </Motion.div>
      <Motion.div
        className="mockup-chip chip-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>◉</span> Smart Matching
      </Motion.div>
      <Motion.div
        className="mockup-chip chip-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>◆</span> JWT Auth
      </Motion.div>
    </Motion.div>
  );
}

/* ─────────────────────────────────────────────
   TODO MOCKUP — interactive-looking preview
───────────────────────────────────────────── */
function TodoMockup() {
  const tasks = [
    {
      id: 1,
      text: "Design landing page wireframe",
      done: true,
      tag: "Design",
      color: "#a78bfa",
    },
    {
      id: 2,
      text: "Set up Express REST API routes",
      done: true,
      tag: "Backend",
      color: "#38bdf8",
    },
    {
      id: 3,
      text: "Integrate MongoDB with Mongoose",
      done: false,
      tag: "Database",
      color: "#34d399",
    },
    {
      id: 4,
      text: "Build task filter & search UI",
      done: false,
      tag: "Frontend",
      color: "#5b7fff",
    },
    {
      id: 5,
      text: "Deploy to Vercel with CI/CD",
      done: false,
      tag: "DevOps",
      color: "#fb923c",
    },
  ];
  const done = tasks.filter((t) => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <Motion.div
      className="project-mockup"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Motion.div
        className="browser-frame mockup-float mockup-float--delayed"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="browser-bar">
          <div className="browser-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-url">taskflow-app.vercel.app</div>
        </div>
        <div className="browser-screen todo-screen">
          {/* App header */}
          <div className="td-header">
            <div className="td-header-left">
              <span className="td-app-name">✦ TaskFlow</span>
              <span className="td-date">19 Apr 2026</span>
            </div>
            <div className="td-add-btn">+ Add Task</div>
          </div>

          {/* Progress */}
          <div className="td-progress">
            <div className="td-progress-meta">
              <span className="td-prog-label">Today&apos;s Progress</span>
              <span className="td-prog-pct">
                {done}/{tasks.length} done
              </span>
            </div>
            <div className="td-prog-track">
              <div className="td-prog-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Task list */}
          <div className="td-list">
            {tasks.map((t) => (
              <div key={t.id} className={`td-item ${t.done ? "td-done" : ""}`}>
                <div className={`td-check ${t.done ? "td-check--done" : ""}`}>
                  {t.done && <span>✓</span>}
                </div>
                <span className="td-text">{t.text}</span>
                <span
                  className="td-tag"
                  style={{
                    color: t.color,
                    borderColor: `${t.color}40`,
                    background: `${t.color}10`,
                  }}
                >
                  {t.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Motion.div>

      {/* Floating chips */}
      <Motion.div
        className="mockup-chip chip-1"
        style={{ "--chip-c": "#34d399" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>✓</span> {done} Completed
      </Motion.div>
      <Motion.div
        className="mockup-chip chip-2"
        style={{ "--chip-c": "#5b7fff" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>◈</span> Drag &amp; Drop
      </Motion.div>
      <Motion.div
        className="mockup-chip chip-3"
        style={{ "--chip-c": "#a78bfa" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <span>◉</span> Categories
      </Motion.div>
    </Motion.div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "govscheme",
    number: "01",
    tag: "Full Stack · MERN",
    title: "GovScheme",
    subtitle: "Government Scheme Eligibility Platform",
    description:
      "A full-stack web application that helps citizens discover and check their eligibility for 450+ central and state government welfare schemes — all in one place. Built with a smart eligibility engine that matches user profiles to relevant schemes instantly.",
    liveUrl: "https://smart-scheme-recommender.vercel.app/",
    githubUrl: "https://github.com/Shamil710/Smart-Scheme-Recommender",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel"],
    highlights: [
      { icon: "◈", stat: "450+", label: "Active Schemes" },
      { icon: "◉", stat: "36", label: "States Covered" },
      { icon: "◆", stat: "12", label: "Categories" },
    ],
    features: [
      "Smart eligibility matching engine",
      "User profile & dashboard",
      "Save & track schemes",
      "Admin panel for scheme management",
      "Category & state-based filtering",
    ],
    Mockup: GovMockup,
    accentColor: "#5b7fff",
  },
  {
    id: "taskflow",
    number: "02",
    tag: "Full Stack · MERN",
    title: "TaskFlow",
    subtitle: "Collaborative Task Management App",
    description:
      "A full-stack productivity application for managing personal and team tasks. Features real-time task updates, drag-and-drop reordering, category filters, and a clean dashboard — built to keep workflows organised and efficient.",
    liveUrl: "#",
    githubUrl: "https://github.com/Shamil710/TO-Do-Web-App",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Vercel"],
    highlights: [
      { icon: "◈", stat: "5+", label: "Task Views" },
      { icon: "◉", stat: "∞", label: "Tasks / User" },
      { icon: "◆", stat: "100%", label: "Responsive" },
    ],
    features: [
      "Create, edit & delete tasks",
      "Drag-and-drop task reordering",
      "Category & priority filtering",
      "User auth with JWT",
      "Progress tracking dashboard",
    ],
    Mockup: TodoMockup,
    accentColor: "#a78bfa",
    comingSoon: true,
  },
];

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ project, index, inView }) {
  const {
    number,
    tag,
    title,
    subtitle,
    description,
    liveUrl,
    githubUrl,
    tech,
    highlights,
    features,
    Mockup,
    accentColor,
    comingSoon,
  } = project;

  const isReversed = index % 2 === 1;

  return (
    <Motion.div
      className={`project-featured ${isReversed ? "project-featured--rev" : ""}`}
      style={{ "--proj-accent": accentColor }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      {/* ── LEFT / INFO ── */}
      <Motion.div
        className="project-info"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Motion.div className="project-number-tag" variants={fadeUp}>
          <span className="proj-num">{number}</span>
          <span className="proj-tag">{tag}</span>
          {comingSoon && <span className="proj-soon-badge">In Progress</span>}
        </Motion.div>

        <Motion.h3 className="project-title" variants={slideInLeft}>
          {title}
        </Motion.h3>
        <Motion.p className="project-subtitle" variants={fadeUp}>
          {subtitle}
        </Motion.p>
        <Motion.p className="project-desc" variants={fadeUp}>
          {description}
        </Motion.p>

        {/* Highlights */}
        <Motion.div
          className="project-highlights"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {highlights.map(({ icon, stat, label }) => (
            <Motion.div
              className="proj-highlight"
              key={label}
              variants={staggerItem}
              whileHover={hoverScale}
            >
              <span className="ph-icon">{icon}</span>
              <span className="ph-stat">{stat}</span>
              <span className="ph-label">{label}</span>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Features */}
        <Motion.ul
          className="project-features"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((f) => (
            <Motion.li key={f} variants={staggerItem}>
              <span
                className="feat-dot"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 6px ${accentColor}80`,
                }}
              />
              {f}
            </Motion.li>
          ))}
        </Motion.ul>

        {/* Tech pills */}
        <Motion.div
          className="project-tech"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {tech.map((t) => (
            <Motion.span
              key={t}
              className="tech-pill"
              variants={staggerItem}
              whileHover={hoverScale}
            >
              {t}
            </Motion.span>
          ))}
        </Motion.div>

        {/* CTAs */}
        <Motion.div
          className="project-btns"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Motion.a
            href={liveUrl}
            target={comingSoon ? "_self" : "_blank"}
            rel="noreferrer"
            className={`proj-btn-primary ${comingSoon ? "proj-btn--disabled" : ""}`}
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={{ scale: 0.97 }}
          >
            {comingSoon ? (
              "Coming Soon"
            ) : (
              <>
                Live Demo <span>↗</span>
              </>
            )}
          </Motion.a>
          <Motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-btn-secondary"
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={{ scale: 0.97 }}
          >
            GitHub <span>→</span>
          </Motion.a>
        </Motion.div>
      </Motion.div>

      {/* ── RIGHT / MOCKUP ── */}
      <Mockup />
    </Motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
function Projects() {
  const { ref: sectionRef, inView } = useScrollReveal(0.1);

  return (
    <section id="projects" className="projects">
      <div className="projects-orb" aria-hidden="true" />

      <Motion.div
        className="projects-inner"
        ref={sectionRef}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* HEADER */}
        <Motion.div className="projects-header" variants={staggerContainer}>
          <Motion.div className="section-label" variants={slideInLeft}>
            <span className="label-line" />
            <span className="label-mono">// 02 — PROJECTS</span>
          </Motion.div>
          <Motion.h2 className="projects-heading" variants={slideInLeft}>
            What I&apos;ve <span className="gradient-word">Built</span>
          </Motion.h2>
          <Motion.p className="projects-sub" variants={fadeUp}>
            Real-world projects I&apos;ve shipped — with more on the way.
          </Motion.p>
        </Motion.div>

        {/* PROJECT LIST */}
        <Motion.div
          className="projects-list"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PROJECTS.map((proj, i) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={i}
              inView={inView}
            />
          ))}
        </Motion.div>

        {/* COMING SOON FOOTER */}
        <Motion.div className="projects-more" variants={fadeUp}>
          <div className="more-label">
            <span className="label-line" />
            <span className="label-mono">More projects coming soon</span>
            <span className="label-line" />
          </div>
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default Projects;
