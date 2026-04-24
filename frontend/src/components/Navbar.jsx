import React from "react";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "contact"];
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home", id: "hero" },
    { href: "#about", label: "About", id: "about" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#hero" className="logo" onClick={() => setMenuOpen(false)}>
          Shamil<span>.dev</span>
        </a>

        <div className="nav-right">
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map(({ href, label, id }) => (
              <li key={id}>
                <a
                  href={href}
                  className={activeSection === id ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="./public/assets/resume.pdf"
            className="nav-btn"
            target="_blank"
            rel="noreferrer"
          >
            Resume ↗
          </a>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
