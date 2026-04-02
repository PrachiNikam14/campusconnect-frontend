import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const found = events.find((e) => e.id === Number(id));
    setEvent(found);
  }, [id]);

  if (!event) {
    return <p className="p-6">Event not found</p>;
  }

  return (
    <div className="section">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn-outline mb-4"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="section-title text-grad-primary">
          Event Details
        </h2>
      </div>

      {/* Card */}
      <div className="card p-6 max-w-2xl">

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">
          {event.title}
        </h3>

        <p className="text-gray-500 mb-4">
          {event.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{event.eventDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>{event.maxParticipants} Participants</span>
          </div>

          <div className="flex items-center gap-2">
            <span>🏷️</span>
            <span>{event.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>📌</span>
            <span
              className={`badge ${
                event.status === "APPROVED"
                  ? "bg-green-100 text-green-600"
                  : event.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {event.status}
            </span>
          </div>

        </div>

        {/* 🔥 STATUS BASED UI */}

        {/* Pending Message */}
        {/* {event.status === "PENDING" && (
          <p className="text-yellow-600 mt-6 text-sm">
            Waiting for admin to review and provide event plan...
          </p>
        )} */}

        {event.status === "PENDING" && (
  <button
    onClick={() => navigate(`/college/payment/${event.id}`)}
    className="btn-primary mt-4"
  >
    Test Payment (Dev Only)
  </button>
)}

        {/* Approved Actions */}
        {event.status === "APPROVED" && (
          <div className="flex gap-3 mt-6">

            <button
            onClick={() => navigate(`/college/payment/${event.id}`)}
            className="btn-primary"
            >
            Confirm Event
            </button>

            <button className="btn-outline text-red-500 border-red-300">
              Reject Event
            </button>

          </div>
        )}

        {/* Rejected Message */}
        {event.status === "REJECTED" && (
          <p className="text-red-500 mt-6 text-sm">
            This event request was rejected by admin.
          </p>
        )}

      </div>

    </div>
  );
}

export default EventDetails;