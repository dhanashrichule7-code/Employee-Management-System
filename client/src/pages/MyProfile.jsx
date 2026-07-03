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
   let profileCompletion = 0;

if (user.name) profileCompletion += 25;
if (user.email) profileCompletion += 25;

// User account hai to password bhi set hai
profileCompletion += 25;

// Avatar upload abhi nahi hai
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>
  <div className="mb-4">

  <div className="d-flex justify-content-between mb-2">
    <strong>Profile Completion</strong>
    <span>{profileCompletion}%</span>
  </div>

  <div className="progress" style={{ height: "10px" }}>
    <div
      className="progress-bar bg-success"
      role="progressbar"
      style={{ width: `${profileCompletion}%` }}
      aria-valuenow={profileCompletion}
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>

</div>
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


        <hr />

<h5 className="mt-3">
  {user.name ? "✅" : "❌"} Name Added
</h5>

<h5 className="mt-2">
  {user.email ? "✅" : "❌"} Email Added
</h5>

<h5 className="mt-2">
  ✅ Password Set
</h5>

<h5 className="mt-2 text-danger">
  ❌ Profile Photo Not Added
</h5>


      </div>
    </div>
  );
}

export default MyProfile;