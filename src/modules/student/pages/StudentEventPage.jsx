import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/student/events")
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-hero py-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-purple-200/40 -top-48 -right-48 animate-blob"></div>
      <div className="blob w-80 h-80 bg-pink-200/30 top-1/3 -left-40 animate-blob-2"></div>
      <div className="blob w-64 h-64 bg-blue-200/30 bottom-20 right-20 animate-blob-3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-purple-700 mb-12">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No events available</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Category Badge */}
                {event.category && (
                  <span
                    className="inline-block mb-3 text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
                      color: "#7c3aed",
                    }}
                  >
                    {event.category}
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 truncate">
                  {event.title || "Untitled Event"}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base line-clamp-3 mb-5">
                  {event.description || "No description available."}
                </p>

                <div className="flex justify-between items-center">
                  {/* Event Date */}
                  {event.eventDate && (
                    <p className="text-gray-500 text-sm">
                      📅{" "}
                      {new Date(event.eventDate).toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`${event.id}`} // relative link to /student/events/:id
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-center py-2 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;