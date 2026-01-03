import { useTheme } from "../../store/theme";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="
        relative mx-2 w-full min-w-12 h-8
        rounded-full
        bg-neutral-200 hover:bg-neutral-100
        dark:bg-slate-700 dark:hover:bg-slate-600
        transition-colors
      "
    >
      <span
        className={`
          absolute top-0 left-0
          h-8 w-8
          rounded-full
          bg-neutral-100 dark:bg-slate-600
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </span>
    </button>
  );
};
