export default function Button({ primary = true, style = "", children }) {
  return (
    <button
      className={`${
        primary
          ? "bg-accent hover:scale-105 text-white px-4 py-2 rounded-lg font-bold"
          : "bg-white border hover:scale-105 text-accent border-accent font-bold px-4 py-2 rounded-lg"
      } flex items-center space-x-2 ${style}`}
    >
      {children}
    </button>
  );
}
