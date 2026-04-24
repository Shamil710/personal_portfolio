// import React from "react";

// function Hero() {
//   return (
//     <section id="hero" className="hero">
//       <div className="hero-text">
//         <h1 className="hero-title">
//           <span className="line1">Hi, I'm</span>
//           <br />
//           <span className="line2">
//             <span>S</span>
//             <span>h</span>
//             <span>a</span>
//             <span>m</span>
//             <span>i</span>
//             <span>l</span>
//           </span>
//         </h1>

//         <p className="role">Full Stack Web Developer (MERN)</p>

//         <p className="tagline">
//           Building scalable, user-focused web applications with the MERN stack.
//           Focused on solving real-world problems through clean and efficient
//           code.
//         </p>

//         <div className="buttons">
//           <button className="btn-primary">View Projects</button>
//           <button className="btn-secondary">Contact</button>
//         </div>
//       </div>

//       <div className="scroll-down"></div>
//     </section>
//   );
// }

// export default Hero;

import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  slideInUp,
  hoverScale,
} from "../utils/animationVariants";
import { useScrollReveal, useCounter } from "../hooks/useScrollReveal";

function Hero() {
  const nameLetters = "Shamil".split("");
  const { ref: statsRef, inView: statsInView } = useScrollReveal(0.3);

  const stats = [
    { number: 2, label: "Years Exp." },
    { number: 15, label: "Projects" },
    { number: 8, label: "Clients" },
  ];

  const techStack = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];

  // Count-up for stats
  const expCount = useCounter(stats[0].number, statsInView, 1.5);
  const projCount = useCounter(stats[1].number, statsInView, 1.5);
  const clientCount = useCounter(stats[2].number, statsInView, 1.5);

  return (
    <section id="hero" className="hero">
      {/* Ambient glow behind card */}
      <div className="hero-orb" aria-hidden="true" />

      <Motion.div
        className="hero-text"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* STATUS CHIP */}
        <Motion.div className="status-chip" variants={fadeUp}>
          <span className="status-dot" />
          Available for work
        </Motion.div>

        {/* HEADING */}
        <Motion.h1 className="hero-title" variants={staggerContainer}>
          <Motion.span className="line1" variants={slideInUp}>
            Hi, I&apos;m
          </Motion.span>
          <Motion.span className="line2" variants={staggerContainer}>
            {nameLetters.map((letter, i) => (
              <Motion.span key={i} variants={staggerItem} style={{ "--i": i }}>
                {letter}
              </Motion.span>
            ))}
          </Motion.span>
        </Motion.h1>

        {/* ROLE */}
        <Motion.p className="role" variants={fadeUp}>
          Full Stack Web Developer (MERN)
        </Motion.p>

        {/* TAGLINE */}
        <Motion.p className="tagline" variants={fadeUp}>
          Building scalable, user-focused web applications with the MERN stack.
          Focused on solving real-world problems through clean and efficient
          code.
        </Motion.p>

        {/* DIVIDER */}
        <Motion.div className="hero-divider" variants={fadeUp} />

        {/* BUTTONS */}
        <Motion.div
          className="buttons"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Motion.button
            className="btn-primary"
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View Projects <span className="btn-arrow">→</span>
          </Motion.button>

          <Motion.button
            className="btn-secondary"
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Contact
          </Motion.button>
        </Motion.div>

        {/* STATS WITH COUNT-UP */}
        <Motion.div
          ref={statsRef}
          className="hero-stats"
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          <Motion.div
            className="stat-item"
            variants={staggerItem}
            whileHover={hoverScale}
          >
            <span className="stat-number">{expCount}+</span>
            <span className="stat-label">{stats[0].label}</span>
          </Motion.div>
          <Motion.div
            className="stat-item"
            variants={staggerItem}
            whileHover={hoverScale}
          >
            <span className="stat-number">{projCount}+</span>
            <span className="stat-label">{stats[1].label}</span>
          </Motion.div>
          <Motion.div
            className="stat-item"
            variants={staggerItem}
            whileHover={hoverScale}
          >
            <span className="stat-number">{clientCount}+</span>
            <span className="stat-label">{stats[2].label}</span>
          </Motion.div>
        </Motion.div>

        {/* TECH STACK */}
        <Motion.div
          className="tech-stack"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {techStack.map((tech) => (
            <Motion.span
              className="tech-pill"
              key={tech}
              variants={staggerItem}
              whileHover={hoverScale}
            >
              {tech}
            </Motion.span>
          ))}
        </Motion.div>
      </Motion.div>

      {/* SCROLL INDICATOR */}
      <Motion.div
        className="scroll-down"
        aria-hidden="true"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="scroll-track" />
        <span className="scroll-label">Scroll</span>
      </Motion.div>
    </section>
  );
}

export default Hero;
