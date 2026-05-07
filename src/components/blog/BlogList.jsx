import { Link } from "react-router-dom";

export default function BlogList({ blogs, loading }) {
  if (loading) {
    return <p className="py-10 text-center text-slate-600">Loading blogs...</p>;
  }

  if (!blogs.length) {
    return <p className="py-10 text-center text-slate-600">No posts yet.</p>;
  }

  return (
    <div className="space-y-6">
      {blogs.map((post) => (
        <article key={post.id} className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-800">{post.title}</h2>
          <p className="mt-2 text-slate-600">{post.description}</p>
          <Link to={`/blogs/${post.id}`} className="mt-4 inline-block font-medium text-blue-600 hover:underline">
            Read more
          </Link>
        </article>
      ))}
    </div>
  );
}
