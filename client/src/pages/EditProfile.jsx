import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";
import { updateProfile } from "../services/updateProfileService";
import { toast } from "react-toastify";

function EditProfile() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setFormData({
        name: data.user.name,
        email: data.user.email,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await updateProfile(formData);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    toast.success(data.message);

    navigate("/profile");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          ✏ Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditProfile;