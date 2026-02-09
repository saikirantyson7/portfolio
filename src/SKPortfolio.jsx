import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

/* -------------------- BASIC UI COMPONENTS -------------------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------- NAVBAR -------------------- */
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sai Kiran K
        </h1>
        <div className="flex space-x-6 text-slate-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/experience" className="hover:text-blue-600">Experience</Link>
          <Link to="/skills" className="hover:text-blue-600">Skills</Link>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/certifications" className="hover:text-blue-600">Certifications</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

/* -------------------- HOME -------------------- */
function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
    >
      <div className="text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Cloud & DevOps Engineer
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-slate-700 leading-relaxed">
          9+ years of experience in GCP, AWS, Terraform, Kubernetes, CI/CD, and Cloud Architecture
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <a href="/Sai_Kiran_K_Resume.pdf" download>
            <Button>Download Resume</Button>
          </a>
          <a href="https://www.linkedin.com/in/saikirantyson7" target="_blank" rel="noopener noreferrer">
            <Button className="bg-slate-900 hover:bg-slate-800">LinkedIn</Button>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------- EXPERIENCE -------------------- */
function Experience() {
  const roles = [
    { company: "Mphasis", role: "Delivery Project Lead", period: "Sep 2024 – Present", desc: "Leading enterprise cloud delivery, DevOps transformation, CI/CD standardization, and cost optimization." },
    { company: "Searce Inc", role: "Senior Cloud Engineer", period: "Aug 2022 – Aug 2024", desc: "Designed GCP & AWS architectures, Terraform IaC, Kubernetes platforms, and monitoring." },
    { company: "Accenture", role: "Senior Analyst", period: "Feb 2021 – Aug 2022", desc: "Executed cloud migrations, CI/CD pipelines, and container platforms." },
    { company: "BIARCA", role: "System Engineer", period: "Sep 2017 – Feb 2021", desc: "Managed VMware, Linux systems, and CI automation." }
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-slate-50">
      <h2 className="section-title">Professional Experience</h2>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {roles.map((r, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold">{r.role}</h3>
                <p className="text-blue-600 font-medium">{r.company}</p>
                <p className="text-sm text-slate-500 mb-4">{r.period}</p>
                <p className="text-slate-700">{r.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- SKILLS -------------------- */
function Skills() {
  const skills = [
    "Google Cloud Platform (GCP)",
    "AWS Cloud",
    "Terraform & Infrastructure as Code",
    "Kubernetes & Docker",
    "CI/CD Automation",
    "Cloud Networking & Security",
    "Monitoring & Observability",
    "Linux Administration",
    "Python & Bash Automation",
    "VMware Virtualization"
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-white">
      <h2 className="section-title">Technical Skills</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skills.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -6 }}>
            <Card>
              <CardContent className="p-6 text-center font-medium">{s}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- PROJECTS -------------------- */
function Projects() {
  const projects = [
    { title: "GCP Enterprise Landing Zone", desc: "Terraform-based secure GCP landing zone." },
    { title: "Kubernetes Platform", desc: "Production-grade GKE clusters with CI/CD." },
    { title: "CI/CD Automation", desc: "Jenkins and GitHub Actions pipelines." },
    { title: "Cloud Cost Optimization", desc: "FinOps and automation strategies." }
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-slate-50">
      <h2 className="section-title">Key Projects</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-slate-700">{p.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CERTIFICATIONS -------------------- */
function Certifications() {
  const certs = [
    "Google Cloud Certified – Associate Cloud Engineer",
    "HashiCorp Certified – Terraform Associate",
    "Red Hat Certified Engineer (RHCE)",
    "AWS Certified Cloud Practitioner"
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-white">
      <h2 className="section-title">Certifications</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {certs.map((c, i) => (
          <motion.div key={i} whileHover={{ y: -4 }}>
            <Card>
              <CardContent className="p-6 font-semibold">{c}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center p-10">
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p>📍 Hyderabad, India</p>
        <p>📧 saikiran.kuricheti@gmail.com</p>
        <a href="https://www.linkedin.com/in/saikirantyson7" target="_blank" rel="noopener noreferrer">
          <Button className="mt-6">LinkedIn Profile</Button>
        </a>
      </div>
    </section>
  );
}

/* -------------------- APP -------------------- */
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

/* Add to index.css:
.section-title {
  @apply text-4xl font-bold mb-12 text-center text-slate-800;
}
*/
