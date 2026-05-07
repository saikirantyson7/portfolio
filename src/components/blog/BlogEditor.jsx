import { useEffect, useRef, useState } from "react";

const initialForm = { title: "", description: "", content: "", imageUrl: "" };

const COLORS = ["#111827", "#2563eb", "#047857", "#b91c1c", "#7c3aed", "#ea580c"];
const HIGHLIGHTS = ["#fef3c7", "#dcfce7", "#dbeafe", "#fee2e2", "#ede9fe", "#f3f4f6"];

export default function BlogEditor({ post, onSave, saving }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const editorRef = useRef(null);

  useEffect(() => {
    const nextData = post
      ? {
          title: post.title || "",
          description: post.description || "",
          content: post.content || "",
          imageUrl: post.imageUrl || ""
        }
      : initialForm;

    setFormData(nextData);
    if (editorRef.current) {
      editorRef.current.innerHTML = nextData.content;
    }
  }, [post]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const runCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setFormData((prev) => ({ ...prev, content: editorRef.current?.innerHTML || "" }));
  };

  const handleContentChange = () => {
    setFormData((prev) => ({ ...prev, content: editorRef.current?.innerHTML || "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const plainText = editorRef.current?.innerText?.trim() || "";
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = "Title is required.";
    if (!plainText) nextErrors.content = "Content is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: editorRef.current?.innerHTML || ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-slate-800">{post ? "Edit Blog" : "Create Blog"}</h2>

      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full rounded-xl border px-4 py-2" />
      {errors.title ? <p className="text-sm text-red-600">{errors.title}</p> : null}

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short description"
        className="w-full rounded-xl border px-4 py-2"
      />

      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Optional image URL" className="w-full rounded-xl border px-4 py-2" />

      <div className="rounded-xl border">
        <div className="flex flex-wrap gap-2 border-b bg-slate-50 p-2">
          <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => runCommand("bold")}>B</button>
          <button type="button" className="rounded border px-2 py-1 text-sm italic" onClick={() => runCommand("italic")}>I</button>
          <button type="button" className="rounded border px-2 py-1 text-sm underline" onClick={() => runCommand("underline")}>U</button>
          <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => runCommand("insertUnorderedList")}>• List</button>
          <button type="button" className="rounded border px-2 py-1 text-sm font-mono" onClick={() => runCommand("formatBlock", "<pre>")}>Code</button>
          <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => runCommand("removeFormat")}>Clear</button>

          <div className="ml-2 flex items-center gap-1">
            <span className="text-xs text-slate-600">Text</span>
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className="h-5 w-5 rounded-full border"
                style={{ backgroundColor: color }}
                onClick={() => runCommand("foreColor", color)}
                aria-label={`Text color ${color}`}
              />
            ))}
          </div>

          <div className="ml-2 flex items-center gap-1">
            <span className="text-xs text-slate-600">BG</span>
            {HIGHLIGHTS.map((color) => (
              <button
                key={color}
                type="button"
                className="h-5 w-5 rounded border"
                style={{ backgroundColor: color }}
                onClick={() => runCommand("hiliteColor", color)}
                aria-label={`Highlight ${color}`}
              />
            ))}
          </div>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentChange}
          className="min-h-[280px] w-full rounded-b-xl px-4 py-3 focus:outline-none"
        />
      </div>
      {errors.content ? <p className="text-sm text-red-600">{errors.content}</p> : null}

      <button disabled={saving} className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-60">
        {saving ? "Saving..." : post ? "Update Blog" : "Save Blog"}
      </button>
    </form>
  );
}
