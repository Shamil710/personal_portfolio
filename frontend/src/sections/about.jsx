// function About() {
//   return (
//     <section id="about" className="about">
//       <h2>About Me</h2>

//       <div className="about-container">
//         <div className="about-text">
//           <p>
//             I'm a self-taught full stack developer focused on building
//             real-world web applications that solve actual problems.
//           </p>

//           <p>
//             I started my journey with curiosity and turned it into hands-on
//             experience by developing full-stack MERN applications — including a
//             government scheme eligibility system that helps users find benefits
//             based on their profile.
//           </p>

//           <p>
//             I enjoy working on backend logic, API design, and creating
//             user-friendly interfaces. My goal is to become a skilled developer
//             who builds impactful products and grows through continuous learning.
//           </p>
//         </div>

//         <div className="about-cards">
//           <div className="card">
//             <h3>2+</h3>
//             <p>Years Learning</p>
//           </div>

//           <div className="card">
//             <h3>15+</h3>
//             <p>Projects</p>
//           </div>

//           <div className="card">
//             <h3>8+</h3>
//             <p>Technologies</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;

import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  slideInLeft,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
} from "../utils/animationVariants";
import { useScrollReveal } from "../hooks/useScrollReveal";

function About() {
  const { ref: sectionRef, inView } = useScrollReveal(0.15);

  const stats = [
    { number: "2+", label: "Years Learning", icon: "◈" },
    { number: "15+", label: "Projects Built", icon: "◉" },
    { number: "8+", label: "Technologies", icon: "◆" },
  ];

  const traits = [
    "Self-Taught",
    "Problem Solver",
    "Clean Code",
    "API Design",
    "UI Focused",
    "Fast Learner",
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* Background orb */}
      <div className="about-orb" aria-hidden="true" />

      <Motion.div
        className="about-inner"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* ── LEFT COL ── */}
        <Motion.div className="about-left" variants={staggerContainer}>
          {/* Section label */}
          <Motion.div className="section-label" variants={slideInLeft}>
            <span className="label-line" />
            <span className="label-mono">// 01 — ABOUT ME</span>
          </Motion.div>

          {/* Heading */}
          <Motion.h2 className="about-heading" variants={slideInLeft}>
            Who I <span className="gradient-word">Am</span>
          </Motion.h2>

          {/* Lead paragraph */}
          <Motion.p className="about-lead" variants={fadeLeft}>
            I&apos;m a self-taught full stack developer focused on building
            real-world web applications that solve actual problems.
          </Motion.p>

          {/* Body paragraphs */}
          <Motion.div className="about-body" variants={fadeLeft}>
            <p>
              I started my journey with curiosity and turned it into hands-on
              experience by developing full-stack MERN applications — including
              a government scheme eligibility system that helps users find
              benefits based on their profile.
            </p>
            <p>
              I enjoy working on backend logic, API design, and creating
              user-friendly interfaces. My goal is to become a skilled developer
              who builds impactful products and grows through continuous
              learning.
            </p>
          </Motion.div>

          {/* Trait tags */}
          <Motion.div
            className="about-traits"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {traits.map((t) => (
              <Motion.span
                key={t}
                className="trait-tag"
                variants={staggerItem}
                whileHover={hoverScale}
              >
                {t}
              </Motion.span>
            ))}
          </Motion.div>
        </Motion.div>

        {/* ── RIGHT COL ── */}
        <Motion.div
          className="about-right"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Decorative quote block */}
          <Motion.div
            className="about-quote"
            variants={fadeUp}
            whileHover={hoverLift}
          >
            <span className="quote-mark">"</span>
            <p>
              Turning curiosity into <em>scalable, impactful</em> software.
            </p>
          </Motion.div>

          {/* Stat cards */}
          <Motion.div
            className="about-cards"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {stats.map(({ number, label, icon }) => (
              <Motion.div
                key={label}
                className="about-card"
                variants={staggerItem}
                whileHover={hoverLift}
              >
                <span className="card-icon">{icon}</span>
                <span className="card-number">{number}</span>
                <span className="card-label">{label}</span>
              </Motion.div>
            ))}
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default About;
