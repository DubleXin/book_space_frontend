import { Link, Outlet, useNavigate } from "react-router-dom";
import { BookOpenText, CircleUser } from "lucide-react";
import { ThemeToggle } from "../components/navbar/ThemeToggle";
import SearchBar from "../components/navbar/SearchBar";
import { Button } from "../components/ui/Button";
import { useAuth } from "../store";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  return (
    <div>
      <nav className="flex items-center gap-12 px-8 py-2 min-h-8">
        {/*left home logo button*/}
        <div className="flex-1">
          <Link to="/">
            <BookOpenText className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </Link>
        </div>
        {/*search widget and theme button*/}
        <div
          className="
        flex-[3] 
        flex gap-2 items-center justify-center
        h-full w-full min-w-60"
        >
          <SearchBar />
          <ThemeToggle />
        </div>
        {/*Login & register or if user exists profile button*/}
        <div
          className="
          flex-[2] 
          flex justify-center items-center gap-3"
        >
          {!user ? (
            <>
              <Button
                onClick={() => navigate("/register")}
                className="max-w-[30%]"
                variant="outline"
                size="sm"
              >
                Sign up
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                className="max-w-[30%]"
                size="sm"
              >
                Log In
              </Button>
            </>
          ) : (
            <div
              className="
            text-stone-950
            p-2 rounded-full
            hover:bg-neutral-200

            dark:text-white
            dark:hover:bg-slate-800"
            >
              <Link className="flex gap-2" to="/me">
                <CircleUser />
                <p>{user.email}</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavbarLayout;
