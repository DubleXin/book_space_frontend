import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/explore" style={{ marginRight: 12 }}>
          Explore
        </Link>
        <Link to="/serverless" style={{ marginRight: 12 }}>
          Serverless Test
        </Link>
        <Link to="/protected" style={{ marginRight: 12 }}>
          Protected Test
        </Link>
        <Link to="/recommendation" style={{ marginRight: 12 }}>
          Recommendation Test
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
