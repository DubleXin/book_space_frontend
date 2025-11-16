import { useAuth } from "../store";
import api from "../api/client";

export default function ProtectedPage() {
  const { user, logout } = useAuth();

  const testRequest = async () => {
    try {
      const res = await api.get("/hello");
      console.log("API response:", res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ padding: 40 }}>
      <h1>Protected Content</h1>
      <p>Welcome, {user?.email}</p>
      <p>Your user id is: {user?.sub}</p>

      <button onClick={testRequest}>Test API Request</button>
      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
