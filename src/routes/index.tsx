import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "../styles/portfolio.css";
import profileAsset from "@/assets/profile.png.asset.json";
import resumeAsset from "@/assets/lokesh-resume.pdf.asset.json";
import {
  User,
  BrainCircuit,
  Compass,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Database,
  Code2,
  TrendingUp,
  Copy,
  Check,
  Award,
  Zap,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  FileText,
  Download,
  Github,
  Layers,
  ChevronRight,
  ArrowUp,
} from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lokesh Galakatla — Data & Software" },
      { name: "description", content: "B.Tech CSE (Data Science) student — Python, SQL, React, and full-stack development. Portfolio of Lokesh Galakatla." },
      { property: "og:title", content: "Lokesh Galakatla — Data & Software" },
      { property: "og:description", content: "Portfolio of Lokesh Galakatla — data analysis and full-stack development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("about");
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-portfolio-theme", theme);
  }, [theme]);

  // Custom cursor that follows the mouse with hover feedback for buttons/links
  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let tx = mx, ty = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;

      // Hover feedback for clickable elements
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest("a, button, .tool-card, .story-tab, .proj-card-pro, .exp-card-pro, .contact-copy-btn, .info-card, .pillar-card, .slide-tile");
      if (isInteractive) {
        cursor.classList.add("hovering");
        trail.classList.add("hovering");
      } else {
        cursor.classList.remove("hovering");
        trail.classList.remove("hovering");
      }
    };

    let raf = 0;
    const loop = () => {
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      trail.style.transform = `translate(${tx}px, ${ty}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = ["about", "experience", "projects", "skills", "education"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Move indicator to active nav link
  useEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;
    const active = nav.querySelector<HTMLAnchorElement>(`a[data-id="${activeId}"]`);
    if (!active) return;
    const navRect = nav.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    ind.style.width = r.width + "px";
    ind.style.transform = `translateX(${r.left - navRect.left}px)`;
    ind.style.opacity = "1";
  }, [activeId]);

  useEffect(() => {
    const starLayer = document.getElementById("stars");
    if (starLayer && !starLayer.childElementCount) {
      for (let i = 0; i < 90; i++) {
        const s = document.createElement("span");
        s.style.top = Math.random() * 100 + "%";
        s.style.left = Math.random() * 100 + "%";
        s.style.animationDelay = Math.random() * 4 + "s";
        const size = Math.random() * 1.6 + 1;
        s.style.width = size + "px";
        s.style.height = size + "px";
        starLayer.appendChild(s);
      }
    }
    const asteroidLayer = document.getElementById("asteroids");
    if (asteroidLayer && !asteroidLayer.childElementCount) {
      for (let i = 0; i < 9; i++) {
        const rock = document.createElement("div");
        rock.className = "asteroid";
        const size = Math.random() * 34 + 14;
        rock.style.width = size + "px";
        rock.style.height = size * (0.8 + Math.random() * 0.3) + "px";
        rock.style.left = Math.random() * 100 + "%";
        rock.style.setProperty("--drift-x", Math.random() * 120 - 60 + "px");
        const drift = Math.random() * 30 + 30;
        const tumble = Math.random() * 14 + 10;
        rock.style.animationDuration = `${drift}s, ${tumble}s`;
        rock.style.animationDelay = `-${Math.random() * drift}s, -${Math.random() * tumble}s`;
        asteroidLayer.appendChild(rock);
      }
    }
    const toggle = document.getElementById("navtoggle");
    const menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;
    const onToggle = () => {
      const open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    const close = () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", onToggle);
    const links = menu.querySelectorAll("a");
    links.forEach((a) => a.addEventListener("click", close));
    return () => {
      toggle.removeEventListener("click", onToggle);
      links.forEach((a) => a.removeEventListener("click", close));
    };
  }, []);

  const AnimatedTitle = ({ text }: { text: string }) => (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="anim-letter"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );

  return (
    <div className="portfolio-root" data-theme={theme}>
      <div id="stars" />
      <div id="asteroids" />
      <div className="cursor-trail" ref={trailRef} />
      <div className="cursor-dot" ref={cursorRef} />

      <header>
        <nav>
          <div className="logo"><span className="dot" /><span className="logo-name">LOKESH GALAKATLA</span></div>
          <ul className="navlinks" ref={navRef}>
            <div className="nav-connector" aria-hidden="true" />
            <div className="nav-indicator" ref={indicatorRef} />
            <li><a href="#about" data-id="about" className={activeId==="about"?"active":""}><span className="nav-num">1</span>About</a></li>
            <li><a href="#experience" data-id="experience" className={activeId==="experience"?"active":""}><span className="nav-num">2</span>Experience</a></li>
            <li><a href="#projects" data-id="projects" className={activeId==="projects"?"active":""}><span className="nav-num">3</span>Projects</a></li>
            <li><a href="#skills" data-id="skills" className={activeId==="skills"?"active":""}><span className="nav-num">4</span>Skills</a></li>
            <li><a href="#education" data-id="education" className={activeId==="education"?"active":""}><span className="nav-num">5</span>Education</a></li>
          </ul>
          <div className="nav-actions">
            <button
              className="icon-link theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <a className="icon-link" href="https://github.com/lokesh599" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.35-3.87-1.35-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
            </a>
            <a className="icon-link" href="https://www.linkedin.com/in/lokesh-galakatla-962256305/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" /></svg>
            </a>
            <a className="nav-cta nav-cta-solid" href={resumeAsset.url} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
          <button className="navtoggle" id="navtoggle" aria-label="Toggle menu" aria-expanded="false">
            <span /><span /><span />
          </button>
        </nav>
        <div className="mobile-menu" id="mobileMenu">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="https://github.com/lokesh599" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/lokesh-galakatla-962256305/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="nav-cta" href={resumeAsset.url} target="_blank" rel="noopener noreferrer">Resume</a></li>
          </ul>
        </div>
      </header>

      <main className="wrap">
        <section className="hero" id="top">
          <div>
            <div className="eyebrow kicker-badge">
              <span className="pulse-dot" />
              <Sparkles style={{ width: 14, height: 14 }} />
              <span>CSE (DATA SCIENCE) · CLASS OF 2027</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-line"><AnimatedTitle text="I turn raw data" /></span>
              <br />
              <span className="hero-line">
                <AnimatedTitle text="into " />
                <span className="grad"><AnimatedTitle text="clear decisions." /></span>
              </span>
            </h1>
            <p className="lede">
              B.Tech Computer Science &amp; Engineering undergraduate specializing in Data Science, with hands-on experience in Python analytical modeling and modern full-stack web development.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                <span>View my work</span>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </a>
              <a className="btn btn-ghost" href={resumeAsset.url} target="_blank" rel="noopener noreferrer">
                <Download style={{ width: 15, height: 15 }} />
                <span>Resume</span>
              </a>
              <a className="btn btn-ghost" href="mailto:galakatalalokesh26@gmail.com">
                <Mail style={{ width: 15, height: 15 }} />
                <span>Contact</span>
              </a>
            </div>
            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <div className="h-stat-num">8.08</div>
                <div className="h-stat-lbl">CGPA Academic Score</div>
              </div>
              <div className="hero-stat-card">
                <div className="h-stat-num">2</div>
                <div className="h-stat-lbl">Industry Internships</div>
              </div>
              <div className="hero-stat-card">
                <div className="h-stat-num">2</div>
                <div className="h-stat-lbl">Featured Projects</div>
              </div>
              <div className="hero-stat-card">
                <div className="h-stat-num">AP</div>
                <div className="h-stat-lbl">Surampalem, India</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbits" role="img" aria-label="Solar system orbiting diagram of skills around profile picture">
              <div className="ring" style={{ width: 170, height: 170 }} />
              <div className="ring" style={{ width: 235, height: 235 }} />
              <div className="ring" style={{ width: 300, height: 300 }} />
              <div className="ring" style={{ width: 365, height: 365 }} />
              <div className="ring" style={{ width: 430, height: 430 }} />
              <div className="profile-frame">
                <img
                  src="/profile.jpg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = profileAsset.url;
                  }}
                  alt="Lokesh Galakatla"
                  className="profile-img"
                />
                <div className="profile-ring" />
              </div>
              <div className="core-label">Lokesh</div>
              {[
                { size: 170, dur: "18s", rev: false, name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { size: 235, dur: "24s", rev: true,  name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { size: 235, dur: "24s", rev: true,  name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", delay: "-12s" },
                { size: 300, dur: "30s", rev: false, name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { size: 300, dur: "30s", rev: false, name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", delay: "-15s" },
                { size: 365, dur: "36s", rev: true,  name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { size: 365, dur: "36s", rev: true,  name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", delay: "-18s" },
                { size: 430, dur: "42s", rev: false, name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
                { size: 430, dur: "42s", rev: false, name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", delay: "-21s" },
              ].map((p, i) => (
                <div key={i} className="orbit-path" style={{ width: p.size, height: p.size, animationDuration: p.dur, animationDirection: p.rev ? "reverse" : "normal", animationDelay: p.delay ?? "0s" }}>
                  <div className="planet" style={{ animationDuration: p.dur, animationDirection: p.rev ? "reverse" : "normal", animationDelay: p.delay ?? "0s" }}>
                    <img className="planet-icon" src={p.icon} alt={p.name} />
                    <span className="label">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutSection />

        <section id="experience" className="exp-section-pro">
          <div className="section-head">
            <div className="kicker-badge">
              <Briefcase style={{ width: 14, height: 14 }} />
              <span>CAREER &amp; INTERNSHIPS</span>
            </div>
            <h2 className="section-title">
              Where I've Delivered <span className="grad">Real Value</span>
            </h2>
            <p className="section-sub">
              Two specialized internships spanning both analytical data engineering and production full-stack web application development.
            </p>
          </div>

          <div className="exp-timeline-pro">
            <div className="exp-card-pro">
              <div className="exp-card-header">
                <div>
                  <div className="exp-company-badge">
                    <Code2 className="c-icon" />
                    <span>Smart Bridge · Summer Online Internship</span>
                  </div>
                  <h3 className="exp-role-title">Vibe Coding Intern</h3>
                </div>
                <div className="exp-date-pill">MAY 2026 — JUL 2026</div>
              </div>

              <ul className="exp-bullets">
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Collaborated on the development of modern web applications using industry-standard agile practices.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Built responsive and interactive user interfaces using React.js, TypeScript, HTML, CSS, and JavaScript.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Integrated frontend components with live backend APIs to deliver seamless user experiences.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Utilized Git and GitHub for version control, code reviews, and maintaining clean codebases.</span>
                </li>
              </ul>

              <div className="exp-tech-tags">
                <span>React.js</span><span>TypeScript</span><span>HTML5/CSS3</span><span>Git</span><span>GitHub</span><span>API Integration</span>
              </div>
            </div>

            <div className="exp-card-pro">
              <div className="exp-card-header">
                <div>
                  <div className="exp-company-badge">
                    <Database className="c-icon" />
                    <span>APSSDC · Summer Online Internship</span>
                  </div>
                  <h3 className="exp-role-title">Data Analysis Intern</h3>
                </div>
                <div className="exp-date-pill">MAY 2025 — JUL 2025</div>
              </div>

              <ul className="exp-bullets">
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Analyzed complex real-world datasets using Python to identify underlying trends and derive actionable metrics.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Executed data cleaning, preprocessing, and exploratory visualization to improve data quality for modeling.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Applied statistical analysis techniques to solve data-driven business problems and interpret results effectively.</span>
                </li>
                <li>
                  <CheckCircle2 className="bullet-icon" />
                  <span>Strengthened analytical problem-solving through hands-on project assignments and data pipelines.</span>
                </li>
              </ul>

              <div className="exp-tech-tags">
                <span>Python</span><span>Pandas</span><span>NumPy</span><span>Matplotlib</span><span>Statistical Analysis</span><span>Data Preprocessing</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="proj-section-pro">
          <div className="section-head">
            <div className="kicker-badge">
              <Code2 style={{ width: 14, height: 14 }} />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="section-title">
              Engineering Solutions with <span className="grad">Data &amp; Code</span>
            </h2>
            <p className="section-sub">
              Demonstrating full-spectrum technical capabilities — from cleaning raw data to shipping performant web applications.
            </p>
          </div>

          <div className="proj-grid-pro">
            <div className="proj-card-pro">
              <div className="proj-card-top">
                <span className="proj-tag-pill tag-data">Data Analysis</span>
                <a className="proj-link-icon" href="https://github.com/lokesh599" target="_blank" rel="noopener noreferrer" title="View Source on GitHub">
                  <Github style={{ width: 16, height: 16 }} />
                </a>
              </div>
              <h3 className="proj-title">Student Social Media Addiction</h3>
              <p className="proj-desc">
                Analyzed real-world survey data to uncover usage patterns among students. Cleaned and preprocessed raw survey records before applying statistical techniques to interpret behavioral trends and drive insights.
              </p>
              <div className="proj-highlights">
                <div className="p-hl"><CheckCircle2 className="hl-icon" /> Preprocessed real-world survey datasets</div>
                <div className="p-hl"><CheckCircle2 className="hl-icon" /> Statistical trend analysis &amp; visualization</div>
              </div>
              <div className="proj-stack">
                <span>Python</span><span>Pandas</span><span>NumPy</span><span>Matplotlib</span><span>Jupyter</span>
              </div>
            </div>

            <div className="proj-card-pro">
              <div className="proj-card-top">
                <span className="proj-tag-pill tag-web">Full-Stack Web App</span>
                <a className="proj-link-icon" href="https://github.com/lokesh599" target="_blank" rel="noopener noreferrer" title="View Source on GitHub">
                  <Github style={{ width: 16, height: 16 }} />
                </a>
              </div>
              <h3 className="proj-title">EcoTrack</h3>
              <p className="proj-desc">
                An environmental monitoring and sustainability platform — a responsive web application that visualizes environmental metrics through interactive, reusable UI components, integrated end-to-end with backend APIs.
              </p>
              <div className="proj-highlights">
                <div className="p-hl"><CheckCircle2 className="hl-icon" /> Interactive data visualization UI</div>
                <div className="p-hl"><CheckCircle2 className="hl-icon" /> End-to-end REST API integration</div>
              </div>
              <div className="proj-stack">
                <span>React.js</span><span>TypeScript</span><span>Node.js</span><span>HTML5/CSS3</span><span>Git</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section-pro">
          <div className="section-head">
            <div className="kicker-badge">
              <Layers style={{ width: 14, height: 14 }} />
              <span>TECHNICAL TOOLKIT</span>
            </div>
            <h2 className="section-title">
              Tools &amp; <span className="grad">Technologies</span>
            </h2>
            <p className="section-sub">
              Core technologies, frameworks, and analytical libraries I leverage across data science &amp; web engineering.
            </p>
          </div>
          <div className="tools-grid">
            {[
              { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
              { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
              { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
              { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
              { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
              { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
              { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
              { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
              { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
              { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            ].map((t) => (
              <div key={t.name} className="tool-card" title={t.name}>
                <img src={t.icon} alt={t.name} loading="lazy" />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
          <div className="skills-wrap" style={{ marginTop: 24 }}>
            <div className="skill-group">
              <h4>Data Engineering &amp; Science</h4>
              <div className="chip-row">
                <span className="chip">Data Analysis</span>
                <span className="chip">Data Cleaning</span>
                <span className="chip">Data Visualization</span>
                <span className="chip">Data Preprocessing</span>
                <span className="chip">Database Management</span>
              </div>
            </div>
            <div className="skill-group">
              <h4>Professional Mindset</h4>
              <div className="chip-row">
                <span className="chip">Problem Solving</span>
                <span className="chip">Technical Communication</span>
                <span className="chip">Agile Teamwork</span>
                <span className="chip">Adaptability</span>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="edu-section-pro">
          <div className="section-head">
            <div className="kicker-badge">
              <GraduationCap style={{ width: 14, height: 14 }} />
              <span>ACADEMICS &amp; CERTIFICATIONS</span>
            </div>
            <h2 className="section-title">
              Foundational Excellence &amp; <span className="grad">Achievements</span>
            </h2>
          </div>

          <div className="edu-grid-pro">
            {/* Degree Card */}
            <div className="edu-card-pro">
              <div className="edu-card-header">
                <div className="edu-icon-badge">
                  <GraduationCap />
                </div>
                <div>
                  <h3 className="edu-degree-title">Bachelor of Technology — CSE (Data Science)</h3>
                  <div className="edu-inst">Aditya College of Engineering &amp; Technology, Surampalem</div>
                  <div className="edu-year-pill">2023 – 2027 (Current 3rd Year)</div>
                </div>
              </div>

              <div className="cgpa-box-pro">
                <div className="cgpa-top">
                  <span className="cgpa-num">8.08</span>
                  <span className="cgpa-denom">/ 10 CGPA</span>
                </div>
                <div className="cgpa-bar-wrap">
                  <div className="cgpa-bar-fill" style={{ width: "80.8%" }} />
                </div>
                <span className="cgpa-sub-lbl">80.8% Cumulative Academic Performance</span>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="ach-card-pro">
              <h3 className="ach-title">
                <Award className="icon-sm" /> Verified Certifications &amp; Achievements
              </h3>
              <div className="ach-list">
                <div className="ach-item-pro">
                  <div className="ach-icon"><Award /></div>
                  <div>
                    <h4>APSSDC Data Analysis Internship Certification</h4>
                    <p>Hands-on certification for real-world data cleaning, preprocessing, and statistical analysis using Python.</p>
                  </div>
                </div>
                <div className="ach-item-pro">
                  <div className="ach-icon"><Award /></div>
                  <div>
                    <h4>Introduction to Data Science — Cisco Networking Academy</h4>
                    <p>Verified certification covering foundational data science principles, data pipelines, and analytics tools.</p>
                  </div>
                </div>
                <div className="ach-item-pro">
                  <div className="ach-icon"><Award /></div>
                  <div>
                    <h4>Smart Bridge Vibe Coding Internship Certificate</h4>
                    <p>Web application engineering, React.js UI development, and API integration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SlidePuzzle />

        <section className="contact" id="contact">
          <div className="kicker" style={{ justifyContent: "center", display: "flex" }}>Contact</div>
          <h2>Let's build something with data.</h2>
          <p>Open to internships and entry-level opportunities in data analysis, data engineering, and full-stack development.</p>
          <div className="contact-links">
            <a className="btn btn-primary" href="mailto:galakatalalokesh26@gmail.com">Email me</a>
            <a className="btn btn-ghost" href="tel:+918309113101">+91 8309113101</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/lokesh-galakatla-962256305/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/lokesh599" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </main>

      {/* Floating Back to Top Arrow Button */}
      {showTopBtn && (
        <button
          className="back-to-top-floating"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to Top"
        >
          <ArrowUp className="top-arrow-icon" />
        </button>
      )}

      <footer className="portfolio-footer">
        <div className="footer-content">
          <span>© 2026 Lokesh Galakatla · Built with data &amp; curiosity</span>
        </div>
      </footer>
    </div>
  );
}

function SlidePuzzle() {
  const SIZE = 3;
  const TOTAL = SIZE * SIZE;
  const solvedBoard = Array.from({ length: TOTAL }, (_, i) => (i + 1) % TOTAL); // [1..8,0]

  const isSolvable = (arr: number[]) => {
    let inv = 0;
    const tiles = arr.filter((n) => n !== 0);
    for (let i = 0; i < tiles.length; i++)
      for (let j = i + 1; j < tiles.length; j++)
        if (tiles[i] > tiles[j]) inv++;
    return inv % 2 === 0;
  };

  const shuffle = (): number[] => {
    while (true) {
      const a = [...solvedBoard].sort(() => Math.random() - 0.5);
      if (isSolvable(a) && a.some((v, i) => v !== solvedBoard[i])) return a;
    }
  };

  const [board, setBoard] = useState<number[]>(shuffle);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const solved = board.every((v, i) => v === solvedBoard[i]);

  useEffect(() => {
    if (solved) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [solved]);

  const tryMove = (idx: number) => {
    if (solved) return;
    const empty = board.indexOf(0);
    const [r1, c1] = [Math.floor(idx / SIZE), idx % SIZE];
    const [r2, c2] = [Math.floor(empty / SIZE), empty % SIZE];
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return;
    const next = [...board];
    [next[idx], next[empty]] = [next[empty], next[idx]];
    setBoard(next);
    setMoves((m) => m + 1);
  };

  const reset = () => { setBoard(shuffle()); setMoves(0); setSeconds(0); };

  return (
    <section id="puzzle">
      <div className="section-head">
        <div className="kicker">Puzzle</div>
        <h2 className="section-title">Cosmic slide puzzle</h2>
        <p className="section-sub">Slide the tiles to arrange 1–8 in order. Tap a tile next to the empty space to move it.</p>
      </div>
      <div className="puzzle-bar">
        <span className="puzzle-stat">Moves: <b>{moves}</b></span>
        <span className="puzzle-stat">Time: <b>{seconds}s</b></span>
        {solved && <span className="puzzle-win">Solved! 🎉</span>}
        <button className="btn btn-ghost" onClick={reset}>Shuffle</button>
      </div>
      <div className="slide-grid">
        {board.map((v, i) => (
          <button
            key={i}
            className={`slide-tile${v === 0 ? " empty" : ""}${solved && v !== 0 ? " done" : ""}`}
            onClick={() => tryMove(i)}
            disabled={v === 0}
            aria-label={v === 0 ? "empty" : `tile ${v}`}
          >
            {v !== 0 && <span>{v}</span>}
          </button>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const [activeTab, setActiveTab] = useState<"story" | "philosophy" | "vision">("story");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("galakatalalokesh26@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="about-section">
      <div className="about-bg-glow" aria-hidden="true" />

      <div className="section-head">
        <div className="kicker-badge">
          <span className="pulse-dot" />
          <Sparkles style={{ width: 14, height: 14 }} />
          <span>ABOUT ME</span>
        </div>
        <h2 className="section-title">
          Grounded in Data Analysis, <span className="grad">Driven by Product Engineering</span>
        </h2>
        <p className="section-sub">
          Computer Science &amp; Engineering (Data Science) undergraduate passionate about discovering actionable stories in complex datasets and engineering intuitive modern web applications.
        </p>
      </div>

      <div className="about-main-grid">
        {/* Main Glassmorphic Card */}
        <div className="about-story-card">
          <div className="story-card-header">
            <div className="story-tabs" role="tablist">
              <button
                className={`story-tab ${activeTab === "story" ? "active" : ""}`}
                onClick={() => setActiveTab("story")}
                role="tab"
                aria-selected={activeTab === "story"}
              >
                <User className="tab-icon" />
                <span>My Story</span>
              </button>
              <button
                className={`story-tab ${activeTab === "philosophy" ? "active" : ""}`}
                onClick={() => setActiveTab("philosophy")}
                role="tab"
                aria-selected={activeTab === "philosophy"}
              >
                <BrainCircuit className="tab-icon" />
                <span>Philosophy</span>
              </button>
              <button
                className={`story-tab ${activeTab === "vision" ? "active" : ""}`}
                onClick={() => setActiveTab("vision")}
                role="tab"
                aria-selected={activeTab === "vision"}
              >
                <Compass className="tab-icon" />
                <span>Vision</span>
              </button>
            </div>
            <div className="status-badge">
              <span className="status-dot" />
              <span>Available for Roles</span>
            </div>
          </div>

          <div className="story-card-body">
            {activeTab === "story" && (
              <div className="tab-pane anim-fade-in">
                <p className="story-lead">
                  I'm a <b>Computer Science &amp; Engineering (Data Science)</b> student at Aditya College of Engineering &amp; Technology, maintaining a strong academic standing with a <b>CGPA of 8.08 / 10</b>.
                </p>
                <p>
                  My core interest lies at the intersection of data analysis and software development. I thrive when extracting meaningful patterns from raw data as much as when building responsive, user-centered web applications that turn insights into action.
                </p>
                <p>
                  Through hands-on internships at <b>APSSDC</b> and <b>Smart Bridge</b>, I've built expertise across <b>Python, SQL, and Java</b> for data processing alongside modern web engineering using <b>React.js and TypeScript</b>.
                </p>
                <div className="quote-box">
                  <span className="quote-accent">"</span>
                  <p>I find as much joy in uncovering hidden patterns inside a messy dataset as I do in shipping an intuitive interface that delivers those insights to real people.</p>
                </div>
              </div>
            )}

            {activeTab === "philosophy" && (
              <div className="tab-pane anim-fade-in">
                <div className="philosophy-grid">
                  <div className="philo-item">
                    <div className="philo-icon"><Database /></div>
                    <div>
                      <h4>Data-Informed Decisions</h4>
                      <p>Every software solution is strongest when built on validated data logic, statistical rigor, and clear metrics.</p>
                    </div>
                  </div>
                  <div className="philo-item">
                    <div className="philo-icon"><Code2 /></div>
                    <div>
                      <h4>Clean &amp; Maintainable Code</h4>
                      <p>Prioritizing modular React components, typed APIs, version control hygiene, and accessible UI designs.</p>
                    </div>
                  </div>
                  <div className="philo-item">
                    <div className="philo-icon"><TrendingUp /></div>
                    <div>
                      <h4>Continuous Growth</h4>
                      <p>Constantly upgrading skills across data pipelines, web frameworks, and algorithmic problem-solving.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="tab-pane anim-fade-in">
                <p className="story-lead">
                  Looking ahead, my goal is to join a high-impact engineering team where I can contribute to both data analytical pipelines and user-facing web products.
                </p>
                <p>
                  Whether optimizing data processing workflows or crafting performant frontend interfaces, I aim to continuously bridge the gap between technical data logic and user experience.
                </p>
                <div className="vision-highlights">
                  <div className="v-chip"><CheckCircle2 className="v-icon" /> Target Roles: Data Analyst / Software Engineer</div>
                  <div className="v-chip"><CheckCircle2 className="v-icon" /> Open to: Full-time &amp; Internship Opportunities</div>
                  <div className="v-chip"><CheckCircle2 className="v-icon" /> Location: On-site / Hybrid / Remote</div>
                </div>
              </div>
            )}
          </div>

          <div className="story-card-footer">
            <div className="stat-pill">
              <span className="stat-val">8.08</span>
              <span className="stat-lbl">CGPA</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-val">2</span>
              <span className="stat-lbl">Internships</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-val">2027</span>
              <span className="stat-lbl">Graduation Year</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-val">B.Tech</span>
              <span className="stat-lbl">CSE (Data Science)</span>
            </div>
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="about-info-panel">
          {/* Quick Profile Details */}
          <div className="info-card profile-details-card">
            <div className="about-profile-header">
              <img
                src="/profile.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = profileAsset.url;
                }}
                alt="Lokesh Galakatla"
                className="about-avatar-img"
              />
              <div>
                <h3 className="about-name">Lokesh Galakatla</h3>
                <span className="about-role">B.Tech CSE (Data Science)</span>
              </div>
            </div>
            <div className="info-list">
              <div className="info-row">
                <div className="info-label"><MapPin className="row-icon" /> Location</div>
                <div className="info-val">Kanchugummala, AP</div>
              </div>
              <div className="info-row">
                <div className="info-label"><GraduationCap className="row-icon" /> College</div>
                <div className="info-val">Aditya Coll. of Eng. &amp; Tech.</div>
              </div>
              <div className="info-row">
                <div className="info-label"><Award className="row-icon" /> Specialization</div>
                <div className="info-val">Data Science</div>
              </div>
              <div className="info-row">
                <div className="info-label"><Calendar className="row-icon" /> Class Year</div>
                <div className="info-val">2023 – 2027</div>
              </div>
            </div>
          </div>

          {/* Quick Contact Action Card */}
          <div className="info-card contact-action-card">
            <h3 className="info-card-title">
              <Zap className="icon-sm" /> Get In Touch
            </h3>
            <p className="contact-card-sub">Let's collaborate or discuss potential opportunities.</p>

            <div className="contact-card-actions">
              <button className="contact-copy-btn" onClick={handleCopyEmail} title="Click to copy email">
                <Mail className="btn-icon" />
                <span className="email-text">galakatalalokesh26@gmail.com</span>
                {copied ? <Check className="copy-icon text-green" /> : <Copy className="copy-icon" />}
              </button>

              <div className="contact-btn-group">
                <a href="mailto:galakatalalokesh26@gmail.com" className="contact-mini-btn">
                  <Mail className="mini-icon" /> Email
                </a>
                <a href="tel:+918309113101" className="contact-mini-btn">
                  <Phone className="mini-icon" /> Call
                </a>
                <a href="https://www.linkedin.com/in/lokesh-galakatla-962256305/" target="_blank" rel="noopener noreferrer" className="contact-mini-btn">
                  <ExternalLink className="mini-icon" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Expertise */}
      <div className="about-pillars">
        <div className="pillar-card">
          <div className="pillar-header">
            <div className="pillar-icon-box grad-bg-1"><Database /></div>
            <span className="pillar-num">01</span>
          </div>
          <h3>Data Analytics &amp; Science</h3>
          <p>Extracting trends, cleaning complex datasets, and performing statistical modeling to drive data-backed decisions.</p>
          <div className="pillar-tags">
            <span>Python</span><span>SQL</span><span>Pandas</span><span>NumPy</span>
          </div>
        </div>

        <div className="pillar-card">
          <div className="pillar-header">
            <div className="pillar-icon-box grad-bg-2"><Code2 /></div>
            <span className="pillar-num">02</span>
          </div>
          <h3>Full-Stack Web Development</h3>
          <p>Engineering responsive, dynamic user interfaces connected to backend APIs with standard software practices.</p>
          <div className="pillar-tags">
            <span>React.js</span><span>TypeScript</span><span>HTML5/CSS3</span><span>Git</span>
          </div>
        </div>

        <div className="pillar-card">
          <div className="pillar-header">
            <div className="pillar-icon-box grad-bg-3"><Sparkles /></div>
            <span className="pillar-num">03</span>
          </div>
          <h3>Problem Solving &amp; Logic</h3>
          <p>Applying structured analytical thinking to complex software challenges, optimization, and real-world projects.</p>
          <div className="pillar-tags">
            <span>Java</span><span>Algorithms</span><span>API Integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}

