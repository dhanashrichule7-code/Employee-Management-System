import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>

        <hr />

        <h5>
          <strong>Name :</strong> {user.name}
        </h5>

        <h5 className="mt-3">
          <strong>Email :</strong> {user.email}
        </h5>

        <h5 className="mt-3">
          <strong>Joined :</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </h5>

      </div>
    </div>
  );
}

export default MyProfile;