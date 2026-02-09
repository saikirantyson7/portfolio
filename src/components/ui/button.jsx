export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
