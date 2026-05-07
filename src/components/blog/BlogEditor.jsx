import { useEffect, useState } from "react";

const initialForm = { title: "", description: "", content: "", imageUrl: "" };

export default function BlogEditor({ post, onSave, saving }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(
      post
        ? {
            title: post.title || "",
            description: post.description || "",
            content: post.content || "",
            imageUrl: post.imageUrl || ""
          }
        : initialForm
    );
  }, [post]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = "Title is required.";
    if (!formData.content.trim()) nextErrors.content = "Content is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({ ...formData, title: formData.title.trim(), description: formData.description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-slate-800">{post ? "Edit Blog" : "Create Blog"}</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full rounded-xl border px-4 py-2"
      />
      {errors.title ? <p className="text-sm text-red-600">{errors.title}</p> : null}

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short description"
        className="w-full rounded-xl border px-4 py-2"
      />

      <input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Optional image URL"
        className="w-full rounded-xl border px-4 py-2"
      />

      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        rows={12}
        placeholder="Write your blog content..."
        className="w-full rounded-xl border px-4 py-3"
      />
      {errors.content ? <p className="text-sm text-red-600">{errors.content}</p> : null}

      <button disabled={saving} className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-60">
        {saving ? "Saving..." : post ? "Update Blog" : "Save Blog"}
      </button>
    </form>
  );
}
