import React, { useState, useEffect } from "react";

function CollegeProfile() {

  const [form, setForm] = useState({
    name: "",
    university: "",
    city: "",
    website: "",
  });

  // load from localStorage (mock)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("college")) || {};
    setForm({
      name: stored.name || "",
      university: stored.university || "",
      city: stored.city || "",
      website: stored.website || "",
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("college", JSON.stringify(form));
    alert("Profile Updated!");
  };

  return (
    <div className="section">

      {/* Header */}
      <div className="mb-6">
        <h2 className="section-title text-grad-primary">
          College Profile
        </h2>
        <p className="section-desc">
          Manage your college details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6 max-w-2xl">

        {/* Name */}
        <div className="mb-4">
          <label>College Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* University */}
        <div className="mb-4">
          <label>University</label>
          <input
            type="text"
            name="university"
            value={form.university}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={form.website}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Upload Section (UI only) */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Upload Documents</label>

          <input type="file" className="input mb-2" />
          <input type="file" className="input mb-2" />
          <input type="file" className="input" />

          <p className="text-xs text-gray-500 mt-2">
            Upload logo, NAAC certificate, official letter
          </p>
        </div>

        {/* Button */}
        <button className="btn-primary">
          Save Profile
        </button>

      </form>
    </div>
  );
}

export default CollegeProfile;