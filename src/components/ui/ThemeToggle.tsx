import { useTheme } from "../../store/theme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 mx-2 rounded-md bg-gray-100 hover:bg-gray-200"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};
