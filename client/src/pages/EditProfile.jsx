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

  const [image, setImage] = useState(null);
  const [originalUser, setOriginalUser] = useState({});
  const [preview, setPreview] = useState("");

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

      // Original data save
      setOriginalUser(data.user);

      // Current profile photo preview
      if (data.user.photo) {
        setPreview(
          `http://localhost:5000/uploads/${data.user.photo}`
        );
      } else {
        setPreview(
          `https://ui-avatars.com/api/?name=${data.user.name}`
        );
      }

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // Image Preview
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No Changes Validation
    if (
      formData.name === originalUser.name &&
      formData.email === originalUser.email &&
      !image
    ) {
      toast.info("No changes detected");
      return;
    }

    try {
      const updateData = new FormData();

      updateData.append("name", formData.name);
      updateData.append("email", formData.email);

      if (image) {
        updateData.append("photo", image);
      }

      const data = await updateProfile(updateData);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(data.message);

      navigate("/profile");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "550px" }}
    >
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          ✏ Edit Profile
        </h2>

        {/* Current Photo Preview */}

        <div className="text-center mb-4">

          <img
            src={preview}
            alt="Profile"
            className="rounded-circle shadow"
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              border: "4px solid #0d6efd",
            }}
          />

        </div>

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

         

          <button
            className="btn btn-primary w-100"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditProfile;