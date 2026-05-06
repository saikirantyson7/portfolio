import React, { useState } from "react";
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

function PreparationBlog() {
  const posts = [
    {
      title: "How I Build a 30-Day Cloud Interview Plan",
      date: "May 6, 2026",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
      excerpt:
        "A practical week-by-week schedule to prepare for DevOps and Cloud Engineering interviews while balancing project work.",
      content:
        "I split preparation into four tracks: fundamentals, hands-on labs, system design, and mock interviews. Each week has one main objective and measurable outcome. I track progress and capture short notes to improve long-term recall."
    },
    {
      title: "Terraform Revision Notes That Actually Stick",
      date: "May 4, 2026",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
      excerpt:
        "A lightweight framework for revising Terraform modules, state handling, and practical troubleshooting.",
      content:
        "Instead of re-reading full documentation, I focus on high-frequency interview areas: module composition, remote state, drift, and dependencies. Then I run one compact lab for each topic to reinforce concepts quickly."
    },
    {
      title: "Kubernetes Scenarios I Practice Before Tech Rounds",
      date: "May 1, 2026",
      image:
        "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80",
      excerpt:
        "A curated checklist for pod failures, service routing, autoscaling behavior, and release rollbacks.",
      content:
        "I regularly recreate incidents like CrashLoopBackOff, image pull errors, probe failures, and ingress issues in a sandbox cluster. Practicing diagnosis and articulation helps both in interviews and in production operations."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.2em] text-indigo-100 text-sm font-semibold">preparation subdomain</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">Preparation Blog</h1>
          <p className="mt-5 text-lg md:text-xl max-w-3xl text-indigo-50">
            Notes, strategies, and resources for cloud, DevOps, and architecture interview preparation.
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto py-16 px-6 space-y-10">
        {posts.map((post) => (
          <article key={post.title} className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            <div className="p-8">
              <p className="text-sm text-slate-500 mb-3">{post.date}</p>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{post.title}</h2>
              <p className="text-slate-700 font-medium">{post.excerpt}</p>
              <p className="text-slate-600 mt-4 leading-relaxed">{post.content}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
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
  const [activeCompany, setActiveCompany] = useState(null);

  const companies = [
    {
      name: "Mphasis",
      role: "Delivery Project Lead",
      period: "Sep 2024 – Present",
      projects: [
        {
          title: "Enterprise Cloud Transformation Program",
          responsibilities: [
            "Led multiple enterprise cloud transformation initiatives on GCP.",
            "Defined cloud architecture standards, DevOps models, and CI/CD best practices.",
            "Oversaw Terraform-based infrastructure provisioning and governance.",
            "Mentored engineers, conducted architecture reviews, and ensured delivery quality.",
            "Drove FinOps initiatives for cloud cost optimization."
          ]
        },
        {
          title: "DevOps Platform & Automation",
          responsibilities: [
            "Designed standardized CI/CD pipelines using Jenkins and GitHub Actions.",
            "Implemented automated testing, security scanning, and release strategies.",
            "Improved deployment reliability and reduced lead time through automation."
          ]
        }
      ]
    },
    {
      name: "Searce Inc",
      role: "Senior Cloud Engineer",
      period: "Aug 2022 – Aug 2024",
      projects: [
        {
          title: "GCP Enterprise Landing Zone",
          responsibilities: [
            "Designed and implemented secure GCP landing zones using Terraform.",
            "Configured IAM, Shared VPC, org policies, logging, and monitoring.",
            "Ensured compliance with enterprise security standards."
          ]
        },
        {
          title: "Production Kubernetes Platform (GKE)",
          responsibilities: [
            "Built and operated production-grade GKE clusters.",
            "Implemented autoscaling, ingress, CI/CD integration, and monitoring.",
            "Handled RBAC, secrets management, and cluster upgrades."
          ]
        }
      ]
    },
    {
      name: "Accenture",
      role: "Digital Tech Developer Senior Analyst",
      period: "Feb 2021 – Aug 2022",
      projects: [
        {
          title: "Enterprise Cloud Migration",
          responsibilities: [
            "Migrated on-premise workloads to cloud using IaC.",
            "Built Jenkins CI/CD pipelines for application deployments.",
            "Worked with teams on containerization and performance tuning."
          ]
        }
      ]
    },
    {
      name: "BIARCA",
      role: "System Engineer / Test Engineer",
      period: "Sep 2017 – Feb 2021",
      projects: [
        {
          title: "VMware Infrastructure & Test Automation",
          responsibilities: [
            "Managed VMware virtualized environments and Linux servers.",
            "Automated testing frameworks and CI pipelines.",
            "Improved system reliability and performance monitoring."
          ]
        }
      ]
    },
    {
      name: "Vedams",
      role: "Associate Software Engineer",
      period: "Apr 2015 – Aug 2017",
      projects: [
        {
          title: "Application Support & Infrastructure Operations",
          responsibilities: [
            "Provided application and infrastructure support for production systems.",
            "Handled system administration, monitoring, and issue resolution.",
            "Supported performance optimization and maintenance activities."
          ]
        }
      ]
    }
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-slate-50">
      <h2 className="section-title">Professional Experience</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {companies.map((company, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => setActiveCompany(company)}
          >
            <Card className="rounded-3xl shadow-xl border-0 bg-white hover:shadow-2xl transition">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800">{company.name}</h3>
                <p className="text-blue-600 font-medium">{company.role}</p>
                <p className="text-sm text-slate-500 mt-1">{company.period}</p>
                <p className="mt-4 text-slate-600">Click to view projects & responsibilities</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {activeCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-3xl w-full mx-6 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold">{activeCompany.name}</h3>
                  <p className="text-blue-600 font-medium">{activeCompany.role}</p>
                  <p className="text-sm text-slate-500">{activeCompany.period}</p>
                </div>
                <button
                  onClick={() => setActiveCompany(null)}
                  className="text-slate-500 hover:text-slate-800 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mt-8 space-y-6">
                {activeCompany.projects.map((proj, j) => (
                  <div key={j} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-xl font-semibold mb-2">{proj.title}</h4>
                    <ul className="list-disc ml-6 space-y-1 text-slate-700">
                      {proj.responsibilities.map((r, k) => (
                        <li key={k}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
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
  const isPreparationSubdomain =
    typeof window !== "undefined" && window.location.hostname.split(".")[0] === "preparation";

  if (isPreparationSubdomain) {
    return <PreparationBlog />;
  }

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
