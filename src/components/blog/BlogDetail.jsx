import { Link } from "react-router-dom";

export default function BlogDetail({ post, loading }) {
  if (loading) return <p className="py-10 text-center text-slate-600">Loading post...</p>;
  if (!post) return <p className="py-10 text-center text-slate-600">Post not found.</p>;

  return (
    <article className="rounded-2xl bg-white p-6 shadow">
      <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{post.title}</h1>
      {post.imageUrl ? (
        <img src={post.imageUrl} alt={post.title} className="mt-5 h-72 w-full rounded-xl object-cover" />
      ) : null}
      <p className="mt-6 whitespace-pre-wrap leading-7 text-slate-700">{post.content}</p>
      <Link to="/blogs" className="mt-8 inline-block text-blue-600 hover:underline">
        ← Back to blogs
      </Link>
    </article>
  );
}
