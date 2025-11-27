import { useAuth } from "../store";
import api from "../api/client";
import {
  getMyProfile,
  updateMyProfile,
  getMyReviews,
  createReview,
  toggleStar,
  getMyStarred,
} from "../api/profile";

export default function ProtectedPage() {
  const { user, logout } = useAuth();

  const testHello = async () => {
    try {
      const res = await api.get("/hello");
      console.log("API response:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const testProfile = async () => {
    const profile = await getMyProfile();

    console.log("Profile:", profile);
  };

  const testUpdateProfile = async () => {
    const updated = await updateMyProfile({
      bio: "Updated bio @ " + Date.now(),
    });
    console.log("Updated profile:", updated);
  };

  const testMyReviews = async () => {
    const reviews = await getMyReviews();
    console.log("My Reviews:", reviews);
  };

  const testCreateReview = async () => {
    const review = await createReview({
      bookId: 1,
      message: "Test review " + Date.now(),
      rating: 4,
    });
    console.log("Created Review:", review);
  };

  const testToggleStar = async () => {
    const result = await toggleStar(1);
    console.log("Star toggled:", result);
  };

  const testMyStarred = async () => {
    const starred = await getMyStarred();
    console.log("My Starred:", starred);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Protected Content</h1>
      <p>Welcome, {user?.email}</p>
      <p>Your user id is: {user?.sub}</p>

      <hr />
      <h3>🔧 API Tests</h3>

      <button onClick={testHello}>Test /hello</button>

      <h4>Profile</h4>
      <button onClick={testProfile}>Test getMyProfile()</button>
      <button onClick={testUpdateProfile}>Test updateMyProfile()</button>

      <h4>Reviews</h4>
      <button onClick={testMyReviews}>Test getMyReviews()</button>
      <button onClick={testCreateReview}>Test createReview()</button>

      <h4>Starred</h4>
      <button onClick={testToggleStar}>Test toggleStar()</button>
      <button onClick={testMyStarred}>Test getMyStarred()</button>

      <hr />

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
