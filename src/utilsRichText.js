export function sanitizeBlogHtml(content = "") {
  if (!content) return "";

  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export function preserveLineBreaks(content = "") {
  return content.replace(/\n/g, "<br />");
}
