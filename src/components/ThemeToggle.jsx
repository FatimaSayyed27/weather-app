const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 text-sm rounded-lg bg-black/40 dark:bg-white/20 text-white"
    >
      {dark ? "☀" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
