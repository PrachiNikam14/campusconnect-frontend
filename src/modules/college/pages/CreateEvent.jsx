import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function CreateEvent() {

  // ✅ get edit data
  const location = useLocation();
  const editData = location.state;

  // ✅ form state with prefill
  const [form, setForm] = useState({
    title: editData?.title || "",
    description: editData?.description || "",
    eventDate: editData?.eventDate || "",
    maxParticipants: editData?.maxParticipants || "",
    category: editData?.category || "",
    serviceIds: editData?.serviceIds || [],
  });

  // Dummy services
  const services = [
    { id: 1, name: "Catering" },
    { id: 2, name: "Photography" },
    { id: 3, name: "Decoration" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (id) => {
    let updated = [...form.serviceIds];

    if (updated.includes(id)) {
      updated = updated.filter((s) => s !== id);
    } else {
      updated.push(id);
    }

    setForm({ ...form, serviceIds: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let events = JSON.parse(localStorage.getItem("events")) || [];

    if (editData) {
      // 🔥 UPDATE
      const updated = events.map((e) =>
        e.id === editData.id
          ? { ...form, id: editData.id, status: e.status }
          : e
      );

      localStorage.setItem("events", JSON.stringify(updated));
      alert("Event Updated!");
    } else {
      // 🔥 CREATE
      const newEvent = {
        ...form,
        id: Date.now(),
        status: "PENDING",
      };

      localStorage.setItem("events", JSON.stringify([...events, newEvent]));
      alert("Event Created!");
    }

    // reset form
    setForm({
      title: "",
      description: "",
      eventDate: "",
      maxParticipants: "",
      category: "",
      serviceIds: [],
    });
  };

  return (
    <div className="section">

      {/* Header */}
      <div className="mb-6">
        <h2 className="section-title text-grad-primary">
          {editData ? "Edit Event" : "Create Event"}
        </h2>
        <p className="section-desc">
          Fill details to create a new event request
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6 max-w-2xl">

        <div className="mb-4">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Event Date & Time</label>
          <input
            type="datetime-local"
            name="eventDate"
            value={form.eventDate}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={form.maxParticipants}
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="TECH">Tech</option>
            <option value="CULTURAL">Cultural</option>
            <option value="SPORTS">Sports</option>
          </select>
        </div>

        {/* Services */}
        <div className="mb-6">
          <label>Services Required</label>

          <div className="flex flex-wrap gap-3 mt-2">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                className={`pill ${
                  form.serviceIds.includes(service.id)
                    ? "bg-purple-100 text-purple-600"
                    : "bg-white"
                }`}
              >
                {service.name}
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <button className="btn-primary">
          {editData ? "Update Event" : "Create Event"}
        </button>

      </form>
    </div>
  );
}

export default CreateEvent;