import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  staggerContainer,
  staggerItem,
  hoverScale,
} from "../utils/animationVariants";
import { useScrollReveal } from "../hooks/useScrollReveal";

/* ── Devicons CDN base ── */
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

/* ── Custom inline SVG icons for techs not in devicons ── */
const CustomIcon = {
  "REST APIs": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#5b7fff" strokeWidth="2.5" />
      <path
        d="M4 24h40"
        stroke="#5b7fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 4C17 4 11 13 11 24s6 20 13 20 13-9 13-20S31 4 24 4z"
        stroke="#5b7fff"
        strokeWidth="2"
      />
      <circle cx="24" cy="24" r="4" fill="#5b7fff" />
    </svg>
  ),
  "JWT Auth": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="4"
        y="10"
        width="40"
        height="28"
        rx="6"
        stroke="#FB015B"
        strokeWidth="2.5"
      />
      <circle cx="24" cy="20" r="5" stroke="#FB015B" strokeWidth="2.5" />
      <path
        d="M18 34c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="#FB015B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="30" y="22" width="10" height="3" rx="1.5" fill="#FB015B" />
      <rect x="32" y="19" width="3" height="9" rx="1.5" fill="#FB015B" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6L44 40H4L24 6Z" fill="white" />
    </svg>
  ),
  Mongoose: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6c-5 0-9 2.5-9 6 0 2 1 3.5 2.5 4.5C16 18 15 20 15 22.5c0 4 3 7 7.5 8V38a1.5 1.5 0 003 0v-7.5c4.5-1 7.5-4 7.5-8 0-2.5-1-4.5-2.5-6C32 17.5 33 16 33 14c0-3.5-4-8-9-8z"
        fill="#880000"
      />
      <path
        d="M20 18h8M20 22h8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* ── Skill data ── */
const CATEGORIES = [
  {
    num: "01",
    label: "Frontend",
    tagline: "Building what users see & interact with",
    color: "#5b7fff",
    skills: [
      {
        name: "React.js",
        src: `${DI}/react/react-original.svg`,
        color: "#61DAFB",
      },
      {
        name: "JavaScript",
        src: `${DI}/javascript/javascript-original.svg`,
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        src: `${DI}/typescript/typescript-original.svg`,
        color: "#3178C6",
      },
      {
        name: "HTML5",
        src: `${DI}/html5/html5-original.svg`,
        color: "#E34F26",
      },
      { name: "CSS3", src: `${DI}/css3/css3-original.svg`, color: "#1572B6" },
    ],
  },
  {
    num: "02",
    label: "Backend",
    tagline: "Powering the logic behind the scenes",
    color: "#a78bfa",
    skills: [
      {
        name: "Node.js",
        src: `${DI}/nodejs/nodejs-original.svg`,
        color: "#339933",
      },
      {
        name: "Express.js",
        src: `${DI}/express/express-original.svg`,
        color: "#ffffff",
        invert: true,
      },
      { name: "REST APIs", custom: "REST APIs", color: "#5b7fff" },
      { name: "JWT Auth", custom: "JWT Auth", color: "#FB015B" },
    ],
  },
  {
    num: "03",
    label: "Database",
    tagline: "Structuring and persisting data",
    color: "#38bdf8",
    skills: [
      {
        name: "MongoDB",
        src: `${DI}/mongodb/mongodb-original.svg`,
        color: "#47A248",
      },
      { name: "Mongoose", custom: "Mongoose", color: "#880000" },
      {
        name: "PostgreSQL",
        src: `${DI}/postgresql/postgresql-original.svg`,
        color: "#4169E1",
      },
    ],
  },
  {
    num: "04",
    label: "Tools & DevOps",
    tagline: "Shipping and maintaining projects",
    color: "#34d399",
    skills: [
      { name: "Git", src: `${DI}/git/git-original.svg`, color: "#F05032" },
      {
        name: "GitHub",
        src: `${DI}/github/github-original.svg`,
        color: "#ffffff",
        invert: true,
      },
      { name: "Vercel", custom: "Vercel", color: "#ffffff" },
      {
        name: "Postman",
        src: `${DI}/postman/postman-original.svg`,
        color: "#FF6C37",
      },
      {
        name: "VS Code",
        src: `${DI}/vscode/vscode-original.svg`,
        color: "#007ACC",
      },
    ],
  },
];

function SkillCard({ skill, delay }) {
  return (
    <Motion.div
      className="sic"
      style={{ "--glow": skill.color, animationDelay: delay }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={hoverScale}
    >
      <div className="sic-icon-wrap">
        {skill.custom ? (
          <span className="sic-custom-svg">{CustomIcon[skill.custom]}</span>
        ) : (
          <img
            src={skill.src}
            alt={skill.name}
            className="sic-img"
            style={skill.invert ? { filter: "invert(1) brightness(1.8)" } : {}}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        )}
        {/* Fallback text badge if image fails */}
        {!skill.custom && (
          <span
            className="sic-fallback"
            style={{ display: "none", color: skill.color }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="sic-name">{skill.name}</span>
      <div className="sic-glow-ring" />
    </Motion.div>
  );
}

function Skills() {
  const { ref: sectionRef, inView } = useScrollReveal(0.1);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills-orb" aria-hidden="true" />
      <div className="skills-orb2" aria-hidden="true" />

      <Motion.div
        className="skills-inner"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* ── HEADER ── */}
        <Motion.div className="skills-header" variants={staggerContainer}>
          <Motion.div className="section-label" variants={slideInLeft}>
            <span className="label-line" />
            <span className="label-mono">// 03 — SKILLS</span>
          </Motion.div>
          <Motion.h2 className="skills-heading" variants={slideInLeft}>
            My <span className="gradient-word">Tech Stack</span>
          </Motion.h2>
          <Motion.p className="skills-sub" variants={fadeUp}>
            Technologies and tools I use to bring ideas to life.
          </Motion.p>
        </Motion.div>

        {/* ── CATEGORY ROWS ── */}
        <Motion.div
          className="skills-categories"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {CATEGORIES.map((cat, ci) => (
            <Motion.div
              key={cat.num}
              className="sc-row"
              style={{
                "--cat-color": cat.color,
              }}
              variants={staggerItem}
              whileInView={{ x: 0 }}
              initial={{ x: ci % 2 === 0 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Left — category meta */}
              <div className="sc-meta">
                <span className="sc-num">{cat.num}</span>
                <div className="sc-info">
                  <span className="sc-label" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                  <span className="sc-tagline">{cat.tagline}</span>
                </div>
                <div className="sc-connector">
                  <span className="sc-connector-dot" />
                  <span className="sc-connector-line" />
                </div>
              </div>

              {/* Right — skill icon cards */}
              <div className="sc-icons">
                {cat.skills.map((s, si) => (
                  <SkillCard key={s.name} skill={s} delay={`${si * 0.07}s`} />
                ))}
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* ── PILL CLOUD ── */}
        <Motion.div
          className="skills-cloud"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="cloud-label">All technologies I&apos;ve worked with</p>
          <Motion.div
            className="cloud-pills"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {CATEGORIES.flatMap((c) =>
              c.skills.map((s) => (
                <Motion.span
                  key={s.name}
                  className="tech-pill"
                  variants={staggerItem}
                  whileHover={hoverScale}
                >
                  {s.name}
                </Motion.span>
              )),
            )}
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default Skills;
