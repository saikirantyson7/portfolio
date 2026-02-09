import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold text-slate-800">Sai Kiran K</h1>
      <div className="flex items-center space-x-6 text-slate-700">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/experience" className="hover:text-blue-600">Experience</Link>
        <Link to="/skills" className="hover:text-blue-600">Skills</Link>
        <Link to="/projects" className="hover:text-blue-600">Projects</Link>
        <Link to="/certifications" className="hover:text-blue-600">Certifications</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center p-10">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cloud & DevOps Engineer
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-slate-700">
          2x GCP Certified | Terraform Certified | 9+ years of experience in Cloud Architecture, DevOps Automation & Platform Engineering
        </p>
        <a href="/Sai_Kiran_K_Resume.pdf" download>
          <Button className="mt-8 rounded-2xl px-8 py-6 text-lg shadow-lg">Download Resume</Button>
        </a>
      </div>
    </motion.div>
  );
}

function Experience() {
  const roles = [
    {
      company: "Mphasis",
      role: "Delivery Project Lead",
      period: "Sep 2024 – Present",
      desc: "Leading cloud delivery initiatives, mentoring engineers, driving DevOps best practices, CI/CD standardization, and cloud cost optimization."
    },
    {
      company: "Searce Inc",
      role: "Senior Cloud Engineer",
      period: "Aug 2022 – Aug 2024",
      desc: "Designed and implemented GCP & AWS cloud architectures, Terraform IaC modules, Kubernetes platforms, CI/CD pipelines, monitoring and security best practices."
    },
    {
      company: "Accenture",
      role: "Digital Tech Developer Senior Analyst",
      period: "Feb 2021 – Aug 2022",
      desc: "Worked on cloud migration projects, infrastructure automation, Jenkins pipelines, containerized workloads and enterprise monitoring solutions."
    },
    {
      company: "BIARCA",
      role: "System Engineer / Test Engineer",
      period: "Sep 2017 – Feb 2021",
      desc: "Managed VMware infrastructure, Linux systems, automated testing frameworks, CI pipelines, and system reliability improvements."
    },
    {
      company: "Vedams",
      role: "Associate Software Engineer",
      period: "Apr 2015 – Feb 2021",
      desc: "Application support, system administration, infrastructure maintenance and performance optimization."
    }
  ];

  return (
    <div className="min-h-screen px-10 py-16 bg-slate-50">
      <h2 className="text-4xl font-bold mb-10 text-center">Professional Experience</h2>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {roles.map((r, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}>
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold">{r.role}</h3>
                <p className="text-blue-600 font-medium">{r.company}</p>
                <p className="text-sm text-slate-500 mb-3">{r.period}</p>
                <p className="text-slate-700">{r.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const skills = [
    "Google Cloud Platform (GCP) – GCE, GKE, Cloud Run, Cloud Functions",
    "AWS Cloud – EC2, EKS, S3, IAM",
    "Terraform – Infrastructure as Code (IaC), Modules, State, Workspaces",
    "Kubernetes Administration & Docker Containers",
    "CI/CD Pipelines – Jenkins, GitHub Actions, GitLab CI",
    "Linux System Administration (RHEL, Ubuntu)",
    "Cloud Networking – VPC, Subnets, Load Balancers, DNS",
    "Cloud Security – IAM, RBAC, Secrets Management, Policies",
    "Monitoring & Observability – Cloud Monitoring, Prometheus, Grafana",
    "Scripting & Automation – Python, Bash",
    "VMware Infrastructure & Virtualization",
    "DevOps Tools – Git, Helm, SonarQube"
  ];

  return (
    <div className="min-h-screen px-10 py-16 bg-white">
      <h2 className="text-4xl font-bold mb-10 text-center">Cloud & DevOps Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skills.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className="rounded-3xl shadow-md hover:shadow-xl transition">
              <CardContent className="p-6 font-medium text-center">{s}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "GCP Enterprise Landing Zone (Terraform)",
      desc: "Designed and implemented a scalable GCP landing zone using Terraform, org policies, IAM, shared VPC, logging, monitoring, and billing automation. Optimized for security and compliance."
    },
    {
      title: "Production Kubernetes Platform (GKE)",
      desc: "Built highly available GKE clusters with autoscaling, ingress controllers, CI/CD integration, monitoring, logging, and security best practices for microservices workloads."
    },
    {
      title: "DevOps CI/CD Automation Framework",
      desc: "Developed end-to-end CI/CD pipelines using Jenkins and GitHub Actions for containerized applications including automated testing, image scanning, and deployments."
    },
    {
      title: "Cloud Cost Optimization & FinOps",
      desc: "Implemented cloud cost optimization strategies including rightsizing, committed use discounts, monitoring dashboards, and automation resulting in significant cost savings."
    }
  ];

  return (
    <div className="min-h-screen px-10 py-16 bg-slate-50">
      <h2 className="text-4xl font-bold mb-10 text-center">Key Projects</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}>
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                <p className="text-slate-700">{p.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Certifications() {
  const certs = [
    "Google Cloud Certified – Associate Cloud Engineer (2x)",
    "HashiCorp Certified – Terraform Associate (003)",
    "Red Hat Certified Engineer (RHCE)",
    "Architecting Hybrid Cloud Infrastructure with Anthos",
    "AWS Certified Cloud Practitioner"
  ];

  return (
    <div className="min-h-screen px-10 py-16 bg-white">
      <h2 className="text-4xl font-bold mb-10 text-center">Certifications</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {certs.map((c, i) => (
          <motion.div key={i} whileHover={{ y: -4 }}>
            <Card className="rounded-3xl shadow-lg">
              <CardContent className="p-6 font-semibold">{c}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
      <div className="text-center p-10">
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg">📍 Hyderabad, India</p>
        <p className="text-lg">📧 saikiran.kuricheti@gmail.com</p>
        <a href="https://www.linkedin.com/in/saikirantyson7" target="_blank" rel="noopener noreferrer">
          <Button className="mt-6 rounded-2xl px-8 py-6 text-lg shadow-lg">LinkedIn Profile</Button>
        </a>
      </div>
    </div>
  );
}

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
