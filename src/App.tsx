import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Link to="/" style={{ marginRight: 15 }}>Home</Link>
      <Link to="/experience" style={{ marginRight: 15 }}>Experience</Link>
      <Link to="/skills" style={{ marginRight: 15 }}>Skills</Link>
      <Link to="/projects" style={{ marginRight: 15 }}>Projects</Link>
      <Link to="/certifications" style={{ marginRight: 15 }}>Certifications</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: 40 }}>
      <h1>Cloud & DevOps Engineer</h1>
      <p>GCP | Terraform | Kubernetes | CI/CD | Linux</p>
      <a href="/Sai_Kiran_K_Resume.pdf" download>
        Download Resume
      </a>
    </motion.div>
  );
}

function Page({ title }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>{title}</h2>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Page title="Experience" />} />
        <Route path="/skills" element={<Page title="Skills" />} />
        <Route path="/projects" element={<Page title="Projects" />} />
        <Route path="/certifications" element={<Page title="Certifications" />} />
        <Route path="/contact" element={<Page title="Contact" />} />
      </Routes>
    </Router>
  );
}
