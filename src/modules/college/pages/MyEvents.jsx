import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

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
          My Events
        </h2>
        <p className="section-desc">
          View and manage all your events
        </p>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Participants</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="border-t">

                  <td className="p-4 font-medium">
                    {event.title}
                  </td>

                  <td className="p-4">
                    {event.eventDate}
                  </td>

                  <td className="p-4">
                    {event.category}
                  </td>

                  <td className="p-4">
                    {event.maxParticipants}
                  </td>

                  <td className="p-4">
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
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => navigate(`/college/event/${event.id}`)}
                      className="btn-outline text-xs"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate("/college/create-event", { state: event })}
                      className="btn-outline text-xs"
                    >
                      Edit
                    </button>

                    {event.status === "PENDING" && (
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="btn-primary text-xs bg-red-500"
                      >
                        Delete
                      </button>
                    )}

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyEvents;