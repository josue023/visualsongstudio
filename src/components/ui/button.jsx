export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-full font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
