import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ExternalLink,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Database,
  BrainCircuit,
  Workflow,
  Cpu,
  ChevronRight,
} from "lucide-react";

type Project = {
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
};

// Portfolio content
const projects: Project[] = [
  {
    title: "AI & CCTV Analytics for 7-Eleven",
    type: "Computer Vision · Retail AI",
    year: "2025",
    description:
      "Developed vehicle detection and timing workflows to flag overstayed parking across branches, plus an operations dashboard for branch data and store-specific configuration. Also explored in-store customer behavior to identify high-engagement product zones.",
    tags: [
      "YOLO12",
      "Deep OC-SORT",
      "PyTorch",
      "ONNX Runtime",
      "CUDA",
      "Computer Vision",
    ],
  },
  {
    title: "Allselect Promotion Data Pipeline",
    type: "Data Engineering · BI",
    year: "2026",
    description:
      "Reviewed legacy SQL powering Shopkrob and Allselect promotion dashboards, documented the logic with flowcharts and a guide, and automated BigQuery processing with scheduled queries and Auto / Manual backfill modes.",
    tags: ["BigQuery", "SQL", "Scheduled Queries", "Looker Studio"],
  },
  {
    title: "AI Classification Cheese Website",
    type: "AI · Web Application",
    year: "2024",
    description:
      "Designed a responsive cheese-classification website, connected the interface to cloud AI processing through an API, and deployed the site on AWS S3. The model predicts cheese type, category and suitable pairings.",
    tags: ["HTML", "CSS", "JavaScript", "AWS S3", "API", "Jupyter"],
    link: "https://github.com/lopayahc/AI-Classification-Cheese-Website",
  },
  {
    title: "AI JAM: Future Entrepreneur",
    type: "Competition · Product Design",
    year: "2024",
    description:
      "Pitched an AI concept for restaurant stock management, customer-volume forecasting and food-waste reduction. Designed the user experience and presented the solution to the judges at Sripatum University. Awarded Second Runner-up (third place).",
    tags: ["Figma", "Product Thinking", "AI Concept"],
    link: "https://github.com/lopayahc/AI-JAM-Future-Entrepreneur",
  },
  {
    title: "DealGO Application",
    type: "Mobile App · Database",
    year: "2023",
    description:
      "Designed an activity and travel companion app where users can create events, join activities, set participant limits and communicate with other participants.",
    tags: ["Figma", "MIT App Inventor", "SQL"],
    link: "https://github.com/lopayahc/DealGo-Application",
  },
  {
    title: "Automated Medication Dispenser",
    type: "IoT · Embedded Systems",
    year: "2023",
    description:
      "Built a prototype that scans prescription QR codes and sends the information to an Arduino-controlled motorized dispensing mechanism. Combined a Raspberry Pi 4, webcam and mechanical design.",
    tags: [
      "Raspberry Pi",
      "Arduino UNO",
      "Flutter",
      "JavaScript",
      "SolidWorks",
    ],
    link: "https://github.com/lopayahc/Automated-Medication-Dispenser",
  },
  {
    title: "Flood Water Level Detection",
    type: "IoT · Smart Monitoring",
    year: "2022",
    description:
      "Created a water-level monitoring prototype using an ultrasonic sensor, Arduino and ESP8266, sending readings to a Node-RED map/site to help users understand flood conditions.",
    tags: ["C++", "Arduino", "ESP8266", "Node-RED"],
    link: "https://github.com/lopayahc/Flood-Water-Level-Detection/tree/main",
  },
];

const heroImages = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg", "/pic5.jpg"];

// Skills displayed in the toolkit section
const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "HTML", "CSS"],
  },
  {
    title: "AI & Data Science",
    icon: BrainCircuit,
    skills: [
      "PyTorch",
      "YOLO12",
      "Deep OC-SORT",
      "ONNX Runtime",
      "CUDA",
      "FastAPI",
      "NumPy",
      "Pandas",
    ],
  },
  {
    title: "Cloud & Databases",
    icon: Database,
    skills: [
      "Google Cloud BigQuery",
      "Looker Studio",
      "AWS",
      "Firebase",
      "PostgreSQL",
      "MySQL",
      "SQLite",
    ],
  },
  {
    title: "Automation & Tools",
    icon: Workflow,
    skills: [
      "BigQuery Scheduled Queries",
      "Python Selenium",
      "Playwright",
      "Postman",
      "Jupyter / Colab",
      "Figma",
    ],
  },
  {
    title: "IoT & Hardware",
    icon: Cpu,
    skills: ["Raspberry Pi", "Arduino", "IP Cameras"],
  },
];

function App() {
  // UI state
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const galleryPointerStart = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const handleGalleryPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    galleryPointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleGalleryPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (galleryPointerStart.current === null) return;

    const distance = event.clientX - galleryPointerStart.current;
    galleryPointerStart.current = null;

    if (Math.abs(distance) < 40) return;

    setActiveHeroImage((current) =>
      distance < 0
        ? (current + 1) % heroImages.length
        : (current - 1 + heroImages.length) % heroImages.length,
    );
  };

  // Project filters and navigation
  const filters = [
    "All",
    "AI & Computer Vision",
    "Data & Cloud",
    "IoT",
    "Web & Mobile",
  ];
  const filtered = projects.filter(
    (p) =>
      filter === "All" ||
      (filter === "AI & Computer Vision" &&
        /AI|Computer Vision/.test(p.type)) ||
      (filter === "Data & Cloud" && /Data Engineering/.test(p.type)) ||
      (filter === "IoT" && /IoT/.test(p.type)) ||
      (filter === "Web & Mobile" && /Web Application|Mobile App/.test(p.type)),
  );
  const nav = [
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];

  return (
    <main>
      {/* Navigation */}
      <nav className="nav">
        <a className="brand" href="#top">
          CL<span>.</span>
        </a>
        <div className={`navlinks ${menuOpen ? "open" : ""}`}>
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="mailto:chayapol.nem@gmail.com">
            Let's talk <ArrowUpRight size={15} />
          </a>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="overline">
            IOT ENGINEERING STUDENT / AI & SOFTWARE DEVELOPER
          </p>
          <h1>
            Turning data into
            <br />
            <span>real-world impact.</span>
          </h1>
          <p className="hero-copy">
            I'm Chayapol Lamthien (Nemo), an engineering student building
            practical solutions across AI, computer vision, data automation and
            cloud-connected software.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              Explore my work <ArrowUpRight size={17} />
            </a>
            <a
              className="button secondary"
              href="mailto:chayapol.nem@gmail.com"
            >
              <Mail size={16} /> Get in touch
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <MapPin size={15} /> Bangkok, Thailand
            </span>
            <span>
              <GraduationCap size={16} /> KMITL Engineering
            </span>
            <a
              href="https://github.com/lopayahc"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="hero-side">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div
            className="hero-gallery"
            aria-label="Photo gallery. Swipe or drag to change photos."
            onPointerDown={handleGalleryPointerDown}
            onPointerUp={handleGalleryPointerUp}
            onPointerCancel={() => {
              galleryPointerStart.current = null;
            }}
          >
            {heroImages.map((image, index) => (
              <img
                key={image}
                className={`hero-photo ${index === activeHeroImage ? "is-active" : ""}`}
                src={image}
                alt={`Chayapol Lamthien photo ${index + 1}`}
                aria-hidden={index !== activeHeroImage}
              />
            ))}
            <div className="hero-gallery-shade" />
            <div className="hero-gallery-focus" />
            <div className="hero-gallery-dots" aria-label="Choose a photo">
              {heroImages.map((image, index) => (
                <button
                  key={image}
                  className={index === activeHeroImage ? "is-active" : ""}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === activeHeroImage}
                  onClick={() => setActiveHeroImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="floating-note note-one">
            <BrainCircuit size={16} /> Applied AI
          </div>
          <div className="floating-note note-two">
            <Workflow size={16} /> Workflow automation
          </div>
        </div>
        <a href="#about" className="scroll-hint">
          <ArrowDown size={15} /> SCROLL TO EXPLORE
        </a>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-grid">
          <div>
            <h2>
              Engineering ideas
              <br />
              into <span>useful systems.</span>
            </h2>
          </div>
          <div className="about-text">
            <p>
              With around four years of programming experience, I enjoy solving
              practical problems with efficient software. My work spans computer
              vision for retail operations, cloud data workflows and connected
              IoT prototypes.
            </p>
            <p>
              At CP ALL, I contributed to AI/CCTV initiatives for 7-Eleven and
              automated promotion-data workflows with BigQuery and Looker
              Studio. A Work & Travel experience in the United States also
              helped me grow my teamwork and customer-service skills.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section experience" id="experience">
        <div className="section-label">02 / EXPERIENCE</div>
        <div className="section-heading">
          <h2>
            Where I've made
            <br />
            <span>an impact.</span>
          </h2>
        </div>
        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-date">MAR — APR 2026</div>
            <div className="timeline-main">
              <div className="company-line">
                <span className="company-icon">
                  <Database size={19} />
                </span>
                <div>
                  <h3>Data Workflow Automation & Dashboard</h3>
                  <p>
                    CP ALL Public Company Limited <span>· Part-time</span>
                  </p>
                </div>
              </div>
              <ul>
                <li>
                  Analyzed legacy SQL behind Shopkrob and Allselect promotion
                  dashboards, then documented the logic using a flowchart and
                  manual guide.
                </li>
                <li>
                  Automated the Allselect BigQuery pipeline with scheduled
                  queries and config-driven Auto / Manual backfill modes.
                </li>
                <li>
                  Replaced manual Excel analysis with Looker Studio dashboards
                  to reduce repetitive effort.
                </li>
              </ul>
              <div className="tags">
                <span>BigQuery</span>
                <span>SQL</span>
                <span>Looker Studio</span>
                <span>Data Automation</span>
              </div>
            </div>
          </article>
          <article className="timeline-item">
            <div className="timeline-date">JUN — DEC 2025</div>
            <div className="timeline-main">
              <div className="company-line">
                <span className="company-icon">
                  <BriefcaseBusiness size={19} />
                </span>
                <div>
                  <h3>Industrial Internship — AI & CCTV</h3>
                  <p>
                    CP ALL Public Company Limited <span>· Internship</span>
                  </p>
                </div>
              </div>
              <ul>
                <li>
                  Collaborated with the team to identify operational pain points
                  and propose practical project improvements.
                </li>
                <li>
                  Developed vehicle detection and timing models to detect
                  overstayed parking at multiple 7-Eleven branches.
                </li>
                <li>
                  Built a dashboard for monitoring AI operations, visualizing
                  branch data and managing store-specific configurations.
                </li>
                <li>
                  Created an AI solution to analyze in-store customer behavior
                  and identify high-engagement product zones.
                </li>
              </ul>
              <div className="tags">
                <span>Computer Vision</span>
                <span>YOLO12</span>
                <span>ONNX Runtime</span>
                <span>CUDA</span>
                <span>Dashboard</span>
              </div>
            </div>
          </article>
          <article className="timeline-item">
            <div className="timeline-date">MAY — SEP 2026</div>
            <div className="timeline-main">
              <div className="company-line">
                <span className="company-icon">
                  <BriefcaseBusiness size={19} />
                </span>
                <div>
                  <h3>Crew Member — Work & Travel</h3>
                  <p>
                    McDonald's <span>· Wildwood, New Jersey, USA</span>
                  </p>
                </div>
              </div>
              <ul>
                <li>
                  Handled customer orders at the counter and drive-thru and
                  helped customers in different situations.
                </li>
                <li>
                  Prepared food, drinks and desserts while supporting service
                  speed, cleanliness and team operations.
                </li>
              </ul>
              <div className="tags">
                <span>Customer Service</span>
                <span>Teamwork</span>
                <span>Adaptability</span>
              </div>
            </div>
          </article>
          <article className="timeline-item">
            <div className="timeline-date">NOV 2025</div>
            <div className="timeline-main">
              <div className="company-line">
                <span className="company-icon">
                  <ExternalLink size={19} />
                </span>
                <div>
                  <h3>Media Production</h3>
                  <p>Promotional & educational content</p>
                </div>
              </div>
              <p className="plain-copy">
                Produced photos and videos about banana products, with footage
                featured by DailyNews Online and Spacebar Business.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Projects */}
      <section className="section projects" id="projects">
        <div className="section-label">03 / SELECTED WORK</div>
        <div className="section-heading">
          <h2>
            Projects built to
            <br />
            <span>solve problems.</span>
          </h2>
          <p>
            A selection of projects across retail AI, data systems, web
            applications and IoT.
          </p>
        </div>
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filtered.map((p, i) => (
            <article className="project-card" key={p.title}>
              <div className="project-top">
                <span className="project-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project-year">{p.year}</span>
              </div>
              <p className="project-type">{p.type}</p>
              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {p.link && (
                <a
                  className="project-link"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project <ArrowUpRight size={16} />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section skills" id="skills">
        <div className="section-label">04 / TOOLKIT</div>
        <div className="section-heading">
          <h2>
            Tools I use to
            <br />
            <span>make things work.</span>
          </h2>
          <p>
            A practical toolkit across software, AI, data and connected
            hardware.
          </p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((g) => {
            const Icon = g.icon;
            return (
              <article className="skill-card" key={g.title}>
                <div className="skill-icon">
                  <Icon size={20} />
                </div>
                <h3>{g.title}</h3>
                <div className="skill-list">
                  {g.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Education */}
      <section className="section education">
        <div className="section-label">05 / EDUCATION</div>
        <div className="education-card">
          <div className="education-icon">
            <GraduationCap size={25} />
          </div>
          <div className="education-main">
            <p className="project-type">2022 — PRESENT</p>
            <h3>King Mongkut's Institute of Technology Ladkrabang</h3>
            <p>
              Faculty of Engineering · IoT System Information and Industrial
              Physics (Dual Degree)
            </p>
          </div>
          <div className="gpa">
            <strong>3.41</strong>
            <span>GPA / 8 semesters</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="section-label">06 / CONTACT</div>
        <div className="contact-profile">
          <div className="profile-frame">
            <img src="/profile.jpg" alt="Chayapol Lamthien" />
          </div>
        </div>
        <a className="button primary" href="mailto:chayapol.nem@gmail.com">
          chayapol.nem@gmail.com <ArrowUpRight size={17} />
        </a>
        <div className="socials">
          <a
            href="https://github.com/lopayahc"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub
          </a>
          <a href="mailto:chayapol.nem@gmail.com">
            <Mail size={17} /> Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <a className="brand" href="#top">
          CL<span>.</span>
        </a>
        <p>
          Designed & built with purpose · © {new Date().getFullYear()} Chayapol
          Lamthien
        </p>
        <a href="#top" className="back-top">
          BACK TO TOP <ChevronRight size={14} />
        </a>
      </footer>
    </main>
  );
}
export default App;
