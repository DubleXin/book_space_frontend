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
        <Link to="/serverless">Serverless Test</Link>
      </nav>
      <Outlet />
    </div>
  );
}
