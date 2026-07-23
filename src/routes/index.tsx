import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "../styles/portfolio.css";
import profileAsset from "@/assets/profile.png.asset.json";
import resumeAsset from "@/assets/lokesh-resume.pdf.asset.json";

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

  useEffect(() => {
    document.documentElement.setAttribute("data-portfolio-theme", theme);
  }, [theme]);

  // Custom cursor that follows the mouse with a trailing dot
  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let tx = mx, ty = my;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;
    };
    let raf = 0;
    const loop = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      trail.style.transform = `translate(${tx}px, ${ty}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
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
          <div className="logo"><span className="dot" />Lokesh Galakatla</div>
          <ul className="navlinks" ref={navRef}>
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
            <div className="eyebrow">CSE (Data Science) · Class of 2027</div>
            <h1 className="hero-title">
              <span className="hero-line"><AnimatedTitle text="I turn raw data" /></span>
              <br />
              <span className="hero-line">
                <AnimatedTitle text="into " />
                <span className="grad"><AnimatedTitle text="clear decisions." /></span>
              </span>
            </h1>
            <p className="lede">B.Tech Computer Science &amp; Engineering student specializing in Data Science, with hands-on experience across Python data analysis and modern web development.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">View my work →</a>
              <a className="btn btn-ghost" href={resumeAsset.url} target="_blank" rel="noopener noreferrer">Download Resume</a>
            </div>
            <div className="hero-meta">
              <div><b>8.08</b>CGPA</div>
              <div><b>2</b>Internships</div>
              <div><b>2</b>Featured projects</div>
              <div><b>Surampalem, AP</b>Based in</div>
            </div>
          </div>
          <div className="hero-visual">
          <div className="orbits" role="img" aria-label="Orbiting diagram of core skills around a central sun labeled Lokesh">
            <div className="ring" style={{ width: 110, height: 110 }} />
            <div className="ring" style={{ width: 190, height: 190 }} />
            <div className="ring" style={{ width: 270, height: 270 }} />
            <div className="ring" style={{ width: 350, height: 350 }} />
            <div className="ring" style={{ width: 420, height: 420 }} />
            <div className="profile-frame">
              <img src={profileAsset.url} alt="Lokesh Galakatla" className="profile-img" />
              <div className="profile-ring" />
            </div>
            <div className="core-label">Lokesh</div>
            {[
              { size: 110, dur: "14s", rev: false, name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { size: 190, dur: "20s", rev: true,  name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
              { size: 270, dur: "27s", rev: false, name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { size: 350, dur: "34s", rev: true,  name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { size: 420, dur: "42s", rev: false, name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", delay: "0s" },
              { size: 420, dur: "42s", rev: true,  name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", delay: "-21s" },
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

        <section id="about">
          <div className="section-head">
            <div className="kicker">About</div>
            <h2 className="section-title">Grounded in analysis, comfortable building products</h2>
          </div>
          <div className="about-grid">
            <div>
              <p>I'm a <b>Computer Science &amp; Engineering (Data Science)</b> student at Aditya College of Engineering &amp; Technology, currently maintaining a <b>CGPA of 8.08</b>. My interest sits at the intersection of data analysis and software engineering — I like finding the story inside a messy dataset just as much as I like shipping the interface that tells that story to someone else.</p>
              <p>My background spans <b>Python, SQL, and Java</b> for analysis and problem-solving, alongside practical experience building responsive web applications with <b>React.js and TypeScript</b>. Two internships have taken me from cleaning real-world datasets to integrating frontend components with live backend APIs.</p>
              <p>I'm looking for opportunities to apply these skills on projects that matter, keep learning in a fast-moving team, and grow into a well-rounded data &amp; software engineer.</p>
            </div>
            <div className="fact-list">
              <div className="fact"><span>LOCATION</span><span>Kanchugummala, Andhra Pradesh</span></div>
              <div className="fact"><span>EMAIL</span><span>galakatalalokesh26@gmail.com</span></div>
              <div className="fact"><span>PHONE</span><span>+91 8309113101</span></div>
              <div className="fact"><span>DEGREE</span><span>B.Tech CSE (Data Science)</span></div>
              <div className="fact"><span>GRADUATING</span><span>2027</span></div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="section-head">
            <div className="kicker">Experience</div>
            <h2 className="section-title">Where I've worked</h2>
            <p className="section-sub">Two internships, two different sides of building with data — analysis first, then the applications that put it in front of people.</p>
          </div>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-dot" />
              <div className="tl-date">MAY 2026 — JUL 2026</div>
              <div className="tl-role">Vibe Coding Intern</div>
              <div className="tl-org">Smart Bridge · Summer Online Internship</div>
              <ul>
                <li>Collaborated on the development of modern web applications using industry-standard development practices.</li>
                <li>Built responsive and interactive user interfaces using React.js, TypeScript, HTML, CSS, and JavaScript.</li>
                <li>Integrated frontend components with backend APIs to deliver seamless user experiences.</li>
                <li>Used Git and GitHub for version control, collaboration, and clean, maintainable code.</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-dot" />
              <div className="tl-date">MAY 2025 — JUL 2025</div>
              <div className="tl-role">Data Analysis Intern</div>
              <div className="tl-org">APSSDC · Summer Online Internship</div>
              <ul>
                <li>Analyzed real-world datasets using Python to identify trends and extract meaningful insights.</li>
                <li>Performed data cleaning, preprocessing, and visualization to improve data quality and support analysis.</li>
                <li>Applied statistical analysis techniques to solve data-driven problems and interpret results effectively.</li>
                <li>Strengthened analytical thinking through hands-on projects and practical assignments.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="section-head">
            <div className="kicker">Projects</div>
            <h2 className="section-title">Selected work</h2>
            <p className="section-sub">A look at how I approach both ends of the stack — from raw data to a usable interface.</p>
          </div>
          <div className="proj-grid">
            <div className="proj-card">
              <span className="proj-tag">Data Analysis</span>
              <h3>Student Social Media Addiction</h3>
              <p>Analyzed real-world survey data to uncover trends in student social media usage, cleaning and preprocessing the dataset before applying statistical techniques to interpret behavior patterns and support informed decisions.</p>
              <div className="stack">
                <span>Python</span><span>Pandas</span><span>NumPy</span><span>Matplotlib</span><span>Jupyter Notebook</span>
              </div>
            </div>
            <div className="proj-card">
              <span className="proj-tag">Full-Stack Web App</span>
              <h3>EcoTrack</h3>
              <p>An environmental monitoring and sustainability platform — a responsive web application that visualizes environmental data through interactive, reusable UI components, integrated end-to-end with backend APIs.</p>
              <div className="stack">
                <span>React.js</span><span>TypeScript</span><span>Node.js</span><span>HTML/CSS</span><span>Git</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-head">
            <div className="kicker">Skills</div>
            <h2 className="section-title">Toolkit</h2>
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
          <div className="skills-wrap" style={{ marginTop: 20 }}>
            <div className="skill-group">
              <h4>Data</h4>
              <div className="chip-row">
                <span className="chip">Data Analysis</span>
                <span className="chip">Data Cleaning</span>
                <span className="chip">Data Visualization</span>
                <span className="chip">Data Engineering</span>
                <span className="chip">Database Management</span>
              </div>
            </div>
            <div className="skill-group">
              <h4>Working Style</h4>
              <div className="chip-row">
                <span className="chip">Problem Solving</span>
                <span className="chip">Communication</span>
                <span className="chip">Teamwork</span>
                <span className="chip">Time Management</span>
              </div>
            </div>
          </div>
        </section>

        <section id="education">
          <div className="section-head">
            <div className="kicker">Education</div>
            <h2 className="section-title">Academic background &amp; achievements</h2>
          </div>
          <div className="edu-grid">
            <div className="edu-card">
              <h3>Bachelor of Technology — CSE (Data Science)</h3>
              <div className="edu-sub">Aditya College of Engineering &amp; Technology, Surampalem · 2023 – 2027</div>
              <div className="cgpa">8.08 <span>/ 10 CGPA</span></div>
            </div>
            <div className="ach-card">
              <h4>Achievements</h4>
              <ul>
                <li>Successfully completed Data Analysis Internship at APSSDC.</li>
                <li>Introduction to Data Science — Cisco Networking Academy.</li>
              </ul>
            </div>
          </div>
        </section>

        <MemoryPuzzle />

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

      <footer>© 2026 Lokesh Galakatla · Built with data &amp; curiosity</footer>
    </div>
  );
}

function MemoryPuzzle() {
  const emojis = ["🚀", "🪐", "🌙", "⭐", "☄️", "🛰️", "👨‍🚀", "🌌"];
  const build = () => {
    const deck = [...emojis, ...emojis]
      .map((v, i) => ({ id: i, v, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    return deck;
  };
  const [cards, setCards] = useState(build);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const solved = cards.every((c) => c.matched);

  const flip = (idx: number) => {
    if (lock) return;
    const c = cards[idx];
    if (c.flipped || c.matched) return;
    const next = cards.map((x, i) => (i === idx ? { ...x, flipped: true } : x));
    const nextPicked = [...picked, idx];
    setCards(next);
    setPicked(nextPicked);
    if (nextPicked.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = nextPicked;
      if (next[a].v === next[b].v) {
        setTimeout(() => {
          setCards((cs) => cs.map((x, i) => (i === a || i === b ? { ...x, matched: true } : x)));
          setPicked([]);
          setLock(false);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((cs) => cs.map((x, i) => (i === a || i === b ? { ...x, flipped: false } : x)));
          setPicked([]);
          setLock(false);
        }, 800);
      }
    }
  };

  const reset = () => { setCards(build()); setPicked([]); setMoves(0); setLock(false); };

  return (
    <section id="puzzle">
      <div className="section-head">
        <div className="kicker">Puzzle</div>
        <h2 className="section-title">Cosmic memory match</h2>
        <p className="section-sub">A quick break — flip the tiles and match all pairs. Because portfolios should be fun too.</p>
      </div>
      <div className="puzzle-bar">
        <span className="puzzle-stat">Moves: <b>{moves}</b></span>
        <span className="puzzle-stat">Matched: <b>{cards.filter((c) => c.matched).length / 2}</b> / {emojis.length}</span>
        {solved && <span className="puzzle-win">Solved! 🎉</span>}
        <button className="btn btn-ghost" onClick={reset}>Reset</button>
      </div>
      <div className="puzzle-grid">
        {cards.map((c, i) => (
          <button
            key={c.id}
            className={`puzzle-card${c.flipped || c.matched ? " flipped" : ""}${c.matched ? " matched" : ""}`}
            onClick={() => flip(i)}
            aria-label={c.flipped ? c.v : "Hidden card"}
          >
            <span className="puzzle-face puzzle-back">?</span>
            <span className="puzzle-face puzzle-front">{c.v}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
