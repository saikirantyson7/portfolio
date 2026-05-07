import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import BlogEditor from "./components/blog/BlogEditor";
import AuthModal from "./components/blog/AuthModal";
import { createBlog, getBlogById, getBlogs, updateBlog } from "./services/blogService";

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

function PreparationBlogHome() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return <BlogList blogs={blogs} loading={loading} />;
}

function PreparationBlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogById(id).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  return <BlogDetail post={post} loading={loading} />;
}

function PreparationAdmin() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setCurrentPost(null);
      return;
    }
    getBlogById(selectedId).then(setCurrentPost);
  }, [selectedId]);

  const handleSave = async (data) => {
    setSaving(true);
    const today = new Date().toISOString().slice(0, 10);

    if (currentPost) {
      await updateBlog(currentPost.id, { ...data, date: today });
    } else {
      const id = `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
      await createBlog({ id, ...data, date: today });
    }

    setSaving(false);
    setSelectedId("");
    setCurrentPost(null);
    setBlogs(await getBlogs());
    navigate("/blogs");
  };

  return (
    <>
      <AuthModal isOpen={showModal && !isAuthed} onClose={() => navigate("/blogs")} onSuccess={() => { setIsAuthed(true); setShowModal(false); }} />
      {isAuthed ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow">
            <label className="text-sm font-medium text-slate-700">Edit existing post</label>
            <select
              className="mt-2 w-full rounded-xl border px-3 py-2"
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
            >
              <option value="">Create new post</option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>{blog.title}</option>
              ))}
            </select>
          </div>
          <BlogEditor post={currentPost} onSave={handleSave} saving={saving} />
        </div>
      ) : null}
    </>
  );
}

function PreparationBlog() {
  return (
    <Router>
      <main className="min-h-screen bg-slate-50">
        <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-[0.2em] text-indigo-100 text-sm font-semibold">preparation subdomain</p>
            <h1 className="text-4xl font-extrabold mt-3">Preparation Blog</h1>
            <div className="mt-5 flex gap-4 text-sm font-semibold">
              <Link to="/blogs" className="underline">Blogs</Link>
              <Link to="/admin" className="underline">Create/Edit</Link>
            </div>
          </div>
        </header>

        <section className="max-w-5xl mx-auto py-10 px-6">
          <Routes>
            <Route path="/" element={<PreparationBlogHome />} />
            <Route path="/blogs" element={<PreparationBlogHome />} />
            <Route path="/blogs/:id" element={<PreparationBlogDetail />} />
            <Route path="/admin" element={<PreparationAdmin />} />
            <Route path="*" element={<NotFound preparation />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

function NotFound({ preparation = false }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-slate-50">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-slate-500">404</p>
        <h2 className="mt-2 text-4xl font-bold text-slate-800">Page not found</h2>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Link
          to={preparation ? "/blogs" : "/"}
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2 font-medium text-white"
        >
          {preparation ? "Back to blogs" : "Back to home"}
        </Link>
      </div>
    </section>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

/* Add to index.css:
.section-title {
  @apply text-4xl font-bold mb-12 text-center text-slate-800;
}
*/
