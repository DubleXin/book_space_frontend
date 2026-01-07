import { Link, Outlet, useNavigate } from "react-router-dom";
import { BookOpenText, CircleUser } from "lucide-react";
import { ThemeToggle } from "../components/navbar/ThemeToggle";
import SearchBar from "../components/navbar/SearchBar";
import { Button } from "../components/ui/Button";
import { useAuth } from "../store";
import { useMyProfile } from "../hooks";
import NavBarMenu from "../components/navbar/NavBarMenu";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const profileQuery = useMyProfile();
  const profile = profileQuery.data ?? { username: "Loading..." };

  return (
    <div className="text-slate-950 dark:text-white ">
      <nav className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-950/60 backdrop-blur">
        <div className="max-w-8xl px-4 sm:px-6">
          <div className="flex h-14 items-center gap-3">
            {/* Left */}
            <Link
              to="/"
              className="shrink-0 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 hidden shrink-0 md:block"
            >
              <BookOpenText className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </Link>

            {/* Center */}
            <div className="flex flex-1 items-center justify-center gap-2 ">
              <div className="w-full max-w-xl">
                <SearchBar />
              </div>
              <div className="hidden shrink-0 lg:block">
                <ThemeToggle />
              </div>
            </div>

            {/* Right menu on screen <=md*/}
            <NavBarMenu profile={profile} />

            <div className="shrink-0  justify-center items-center gap-2 md:min-w-[220px] hidden lg:flex">
              {!user ? (
                <>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="outline"
                    size="sm"
                  >
                    Sign up
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="secondary"
                    size="sm"
                  >
                    Log In
                  </Button>
                </>
              ) : (
                <Link
                  to="/me"
                  className="flex items-center justify-center gap-2 rounded-full px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <CircleUser className="text-slate-700 dark:text-slate-200" />
                  <p className="text-sm text-slate-800 dark:text-slate-100 max-w-[140px] truncate">
                    {profile.username}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default NavbarLayout;
