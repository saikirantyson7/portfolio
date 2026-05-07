import { useEffect, useRef, useState } from "react";

const initialForm = { title: "", description: "", content: "", imageUrl: "" };

const FONT_OPTIONS = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"];

const toolbarButtons = [
  { label: "Bold", wrap: ["<strong>", "</strong>"] },
  { label: "Italic", wrap: ["<em>", "</em>"] },
  { label: "Code Block", wrap: ["<pre><code>", "</code></pre>"] }
];


export default function BlogEditor({ post, onSave, saving }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const contentRef = useRef(null);

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



  const applyWrap = (prefix, suffix = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selected = formData.content.slice(start, end);
    const nextContent = `${formData.content.slice(0, start)}${prefix}${selected}${suffix}${formData.content.slice(end)}`;

    setFormData((prev) => ({ ...prev, content: nextContent }));

    requestAnimationFrame(() => {
      textarea.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = cursorStart + selected.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const applyColorStyle = (cssProp) => {
    const value = window.prompt(`Enter ${cssProp === "color" ? "text" : "background"} color (e.g. #2563eb):`);
    if (!value) return;
    applyWrap(`<span style="${cssProp}:${value};">`, "</span>");
  };

  const applyFontFamily = () => {
    const value = window.prompt(`Choose font: ${FONT_OPTIONS.join(", ")}`);
    if (!value) return;
    applyWrap(`<span style="font-family:${value};">`, "</span>");
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

      <div className="rounded-xl border border-slate-200 p-3">
        <p className="mb-2 text-sm font-medium text-slate-600">Formatting tools</p>
        <div className="flex flex-wrap gap-2">
          {toolbarButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={() => applyWrap(button.wrap[0], button.wrap[1])}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
            >
              {button.label}
            </button>
          ))}
          <button type="button" onClick={() => applyColorStyle("color")} className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100">Text Colour</button>
          <button type="button" onClick={() => applyColorStyle("background-color")} className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100">BG Colour</button>
          <button type="button" onClick={applyFontFamily} className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100">Font Family</button>
        </div>
      </div>

      <textarea
        ref={contentRef}
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
