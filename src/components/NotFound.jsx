import { Link } from "react-router-dom";

export default function NotFound({ preparation = false }) {
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
