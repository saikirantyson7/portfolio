import { useState } from "react";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const expectedPassword = process.env.REACT_APP_BLOG_ADMIN_PASSWORD;

    if (!expectedPassword) {
      setError("Admin password is not configured.");
      return;
    }

    if (password === expectedPassword) {
      setPassword("");
      setError("");
      onSuccess();
      return;
    }

    setError("Incorrect password. Please try again.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">Admin Access</h2>
        <p className="mt-2 text-sm text-slate-600">Enter password to continue.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="password"
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex justify-end gap-3">
            <button type="button" className="rounded-xl border px-4 py-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
