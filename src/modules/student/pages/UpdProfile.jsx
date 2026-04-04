import { useState } from "react";
import { updateProfile } from "../services/studentService";
import { useNavigate, useLocation } from "react-router-dom";

export default function updateProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const existingData = location.state || {};

  const [form, setForm] = useState({
    rollNumber: existingData.rollNumber || "",
    department: existingData.department || "",
    year: existingData.year || "",
    collegeId: existingData.collegeId || "",
    bio: existingData.bio || "",
    skills: existingData.skills || "",
    hobbies: existingData.hobbies || "",
    linkedinUrl: existingData.linkedinUrl || "",
    githubUrl: existingData.githubUrl || "",
    profilePhoto: null,
    idCard: null,
  });

  const [preview, setPreview] = useState(existingData.profilePhoto || null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "profilePhoto" && file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      // 🔥 required fields
      data.append("rollNumber", form.rollNumber);
      data.append("department", form.department);
      data.append("year", Number(form.year)); // FIX
      data.append("collegeId", Number(form.collegeId)); // FIX
      data.append("bio", form.bio);

      // optional
      if (form.skills) data.append("skills", form.skills);
      if (form.hobbies) data.append("hobbies", form.hobbies);
      if (form.linkedinUrl) data.append("linkedinUrl", form.linkedinUrl);
      if (form.githubUrl) data.append("githubUrl", form.githubUrl);

      // files
      if (form.profilePhoto instanceof File) {
        data.append("profilePhoto", form.profilePhoto);
      }

      if (form.idCard instanceof File) {
        data.append("idCard", form.idCard);
      }

      await updateProfile(data);

      navigate("/profile");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="bg-hero min-h-screen px-3 py-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="card-glass p-6 md:p-8">

          <h2 className="text-2xl font-extrabold text-grad-primary mb-6 text-center">
            {existingData?.rollNumber ? "Edit Profile" : "Create Profile"}
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            <input
              type="file"
              name="profilePhoto"
              onChange={handleChange}
              className="text-xs"
            />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              className="input"
              name="rollNumber"
              placeholder="Roll Number"
              value={form.rollNumber}
              onChange={handleChange}
            />

            <input
              className="input"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />

            <input
              className="input"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
            />

            <input
              className="input"
              name="collegeId"
              placeholder="College ID"
              value={form.collegeId}
              onChange={handleChange}
            />

            <input
              className="input md:col-span-2"
              name="bio"
              placeholder="Write something about yourself..."
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          {/* ID Card */}
          <div className="mt-4">
            <label className="text-xs text-gray-500">Upload ID Card</label>
            <input
              type="file"
              name="idCard"
              className="mt-1 text-xs"
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-primary px-6 py-2" onClick={handleSubmit}>
              Save Profile
            </button>

            <button
              className="btn-outline px-6 py-2"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}