import { useEffect, useState } from "react";

import { getProfile } from "../services/profileService";
import { updatePhoto } from "../services/updatePhotoService";
import { toast } from "react-toastify";
import { removePhoto } from "../services/removePhotoService";

function MyProfile() {
  const [user, setUser] = useState(null);
  
  const [showImage, setShowImage] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");

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

const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setPhoto(file);
  setPreviewPhoto(URL.createObjectURL(file));
};

const handlePhotoUpload = async () => {
  if (!photo) {
    toast.error("Please select a photo");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("photo", photo);

    const data = await updatePhoto(formData);

    toast.success(data.message);

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setPhoto(null);
    setPreviewPhoto("");
    setShowPhotoModal(false);

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Upload Failed"
    );
  }
};

const handleRemovePhoto = async () => {
  try {
    const data = await removePhoto();

    toast.success(data.message);

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setPhoto(null);
    setPreviewPhoto("");
    setShowPhotoModal(false);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to remove photo"
    );
  }
};

  // Profile Completion
  let profileCompletion = 0;

  if (user.name) profileCompletion += 25;
  if (user.email) profileCompletion += 25;

  // Password exists
  profileCompletion += 25;

  if (user.photo) profileCompletion += 25;

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>

        {/* Photo + Details */}

        <div className="row align-items-center">

          {/* Left Side Photo */}

          <div className="col-md-4 text-center mb-3">

            <img
              src={
                user.photo
                  ? `http://localhost:5000/uploads/${user.photo}`
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt="Profile"
              className="rounded-circle shadow"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "4px solid #0d6efd",
                cursor: "pointer",
                transition: "0.3s",
              }}
              title="Click to Change Photo"
              onClick={() => setShowImage(true)}
            />
            {showImage && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      background: "rgba(0,0,0,0.8)",
      zIndex: 9999,
    }}
    onClick={() => setShowImage(false)}
  >
    <img
      src={`http://localhost:5000/uploads/${user.photo}`}
      alt=""
      style={{
        maxWidth: "80%",
        maxHeight: "80%",
        borderRadius: "10px",
      }}
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

            <p
  className="text-primary fw-semibold mt-3"
  style={{ cursor: "pointer" }}
  onClick={() => setShowPhotoModal(true)}
>
  📷 Change Profile Photo
</p>

          </div>

          {/* Right Side Details */}

          <div className="col-md-8">

    <div className="card border-0 shadow-sm">

        <div className="card-body">

            <h4 className="mb-4 text-primary">
                👤 Personal Information
            </h4>

            <div className="row mb-3">

                <div className="col-4 fw-bold text-secondary">
                    Name
                </div>

                <div className="col-8">
                    {user.name}
                </div>

            </div>

            <hr />

            <div className="row mb-3">

                <div className="col-4 fw-bold text-secondary">
                    Email
                </div>

                <div className="col-8">
                    {user.email}
                </div>

            </div>

            <hr />

            <div className="row mb-3">

                <div className="col-4 fw-bold text-secondary">
                    Joined
                </div>

                <div className="col-8">
                    {new Date(user.createdAt).toLocaleDateString()}
                </div>

            </div>

            <hr />

            <div className="row">

                <div className="col-4 fw-bold text-secondary">
                    Status
                </div>

                <div className="col-8">
                    <span className="badge bg-success">
                        Active
                    </span>
                </div>

            </div>

        </div>

    </div>

</div>

        </div>

        <hr />

        {/* Profile Completion */}

        <div className="mb-4">

          <div className="d-flex justify-content-between mb-2">

            <strong>Profile Completion</strong>

            <strong>{profileCompletion}%</strong>

          </div>

          <div
            className="progress"
            style={{ height: "12px" }}
          >
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{
                width: `${profileCompletion}%`,
              }}
            ></div>
          </div>

        </div>

        <hr />

        {/* Status */}

        <h5 className="mt-3">
          {user.name ? "✅" : "❌"} Name Added
        </h5>

        <h5 className="mt-2">
          {user.email ? "✅" : "❌"} Email Added
        </h5>

        <h5 className="mt-2">
          ✅ Password Set
        </h5>

        <h5
          className={`mt-2 ${
            user.photo ? "text-success" : "text-danger"
          }`}
        >
          {user.photo
            ? "✅ Profile Photo Added"
            : "❌ Profile Photo Not Added"}
        </h5>

{/* Change Photo Modal */}
{showPhotoModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    tabIndex="-1"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">📷 Change Profile Photo</h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowPhotoModal(false)}
          ></button>
        </div>

        <div className="modal-body text-center">

  {/* Current Photo */}

  <img
   src={
  previewPhoto
    ? previewPhoto
    : user.photo
    ? `http://localhost:5000/uploads/${user.photo}`
    : `https://ui-avatars.com/api/?name=${user.name}`
}
    alt="Profile"
    className="rounded-circle shadow mb-3"
    style={{
      width: "140px",
      height: "140px",
      objectFit: "cover",
      border: "3px solid #0d6efd",
    }}
  />

  <input
  type="file"
  className="form-control mt-3"
  accept="image/*"
  onChange={handlePhotoChange}
/>

</div>

        <div className="modal-footer">

  {user.photo && (
    <button
      className="btn btn-outline-danger me-auto"
      onClick={handleRemovePhoto}
    >
      🗑 Remove Photo
    </button>
  )}

  <button
    className="btn btn-secondary"
    onClick={() => {
  setPhoto(null);
  setPreviewPhoto("");
  setShowPhotoModal(false);
}}
  >
    Close
  </button>

  <button
    className="btn btn-primary"
    onClick={handlePhotoUpload}
    disabled={!photo}
  >
    Upload Photo
  </button>

</div>

      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default MyProfile;