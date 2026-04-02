import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

const navigate = useNavigate();

const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  const updated = events.filter((e) => e.id !== id);

  localStorage.setItem("events", JSON.stringify(updated));
  setEvents(updated);
};

  return (
    <div className="section">

      {/* Header */}
      <div className="mb-6">
        <h2 className="section-title text-grad-primary">
          Dashboard
        </h2>
        <p className="section-desc">
          Manage your events and track their status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="card p-5 text-center">
          <p className="text-sm text-gray-500">Total Events</p>
          <h3 className="text-2xl font-bold">
            {events.length}
          </h3>
        </div>

        <div className="card p-5 text-center">
          <p className="text-sm text-gray-500">Approved</p>
          <h3 className="text-2xl font-bold text-green-500">
            {events.filter(e => e.status === "APPROVED").length}
          </h3>
        </div>

        <div className="card p-5 text-center">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-500">
            {events.filter(e => e.status === "PENDING").length}
          </h3>
        </div>

      </div>

      {/* Event List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Your Events
        </h3>

        {events.length === 0 ? (
          <p className="text-gray-500">No events created yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">

            {events.map((event) => (
              <div key={event.id} className="card p-5">

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-lg">
                    {event.title}
                  </h4>

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

                <p className="text-sm text-gray-500 mb-2">
                  📅 {event.eventDate}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  👥 {event.maxParticipants} Participants
                </p>

                <div className="flex gap-3">
                <button
                    onClick={() => navigate("/college/create-event", { state: event })}
                    className="btn-outline"
                    >
                    Edit
                </button>

                <button
                      onClick={() => navigate(`/college/event/${event.id}`)}
                      className="btn-primary"
                    >
                      View
                  </button>

                    {event.status === "PENDING" && (
                    <button
                        onClick={() => handleDelete(event.id)}
                        className="btn-primary bg-red-500"
                    >
                        Delete
                    </button>
                    )}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;