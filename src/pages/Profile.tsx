import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../store";
import { getMyProfile } from "../api/profile";
import { Button } from "../components/ui/Button";

const Profile = () => {
  const { user, logout } = useAuth();

  const profileQuey = useQuery({
    queryKey: ["profile", user?.sub],
    queryFn: ({ signal }) => getMyProfile(signal),
    placeholderData: keepPreviousData,
    enabled: !!user,
  });

  const profile = profileQuey.data ?? undefined;

  return (
    <div style={{ padding: 40 }}>
      <h1>Placeholder Content</h1>
      <p>Welcome, {user?.email}</p>
      <p>Your user id is: {profile && profile.userId}</p>
      <p>Your username is: {profile && profile.username}</p>
      <p>Your bio is: {profile && profile.bio}</p>

      <div className="w-20">
        <Button onClick={logout} size="sm" variant="danger">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
