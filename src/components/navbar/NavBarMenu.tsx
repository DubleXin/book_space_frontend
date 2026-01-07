import { CircleUser, Home, Logs, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/Button";
import { useAuth } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import type { Profile } from "../../types/profile";

const NavBarMenu = ({
  profile,
}: {
  profile:
    | Profile
    | {
        username: string;
      };
}) => {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <div className="relative md:block lg:hidden" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10"
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white/95 p-2 shadow-lg backdrop-blur dark:bg-slate-950/90 dark:border-white/10">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/?panel=activity"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Logs className="h-4 w-4" />
            Activity
          </Link>
          <div className="flex items-center justify-between rounded-lg px-3 pr-8 py-2 hover:bg-black/5 dark:hover:bg-white/10">
            <span className="text-sm">Theme</span>
            <div className="w-16">
              <ThemeToggle />
            </div>
          </div>

          <div className="my-2 h-px bg-black/10 dark:bg-white/10" />

          {!user ? (
            <div className="flex flex-col gap-2 px-2 pb-1">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Sign up
              </Button>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Log In
              </Button>
            </div>
          ) : (
            <Link
              to="/me"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              <CircleUser className="h-4 w-4" />
              <span className="truncate">{profile.username}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBarMenu;
