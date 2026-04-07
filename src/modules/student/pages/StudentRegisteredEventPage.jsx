import React, { useEffect, useState } from "react";
import { getRegisteredEvents } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const StudentRegisteredEventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ Navigation

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    try {
      const res = await getRegisteredEvents();

      console.log("API RESPONSE:", res);

      let dataArray = [];
      const rawData = res.data;

      // ✅ HANDLE STRING RESPONSE
      if (typeof rawData === "string") {
        dataArray = JSON.parse(rawData);
      } 
      // ✅ NORMAL ARRAY
      else if (Array.isArray(rawData)) {
        dataArray = rawData;
      } 
      // ✅ FALLBACK
      else if (Array.isArray(rawData?.data)) {
        dataArray = rawData.data;
      }

      console.log("PARSED EVENTS:", dataArray);

      setEvents(dataArray);
    } catch (err) {
      console.error("Error fetching registered events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        My Registered Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-400">
          No registered events found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const eventDate = event.eventDate
              ? new Date(event.eventDate)
              : null;

            const eventId = event.eventId || event.id;

            return (
              <div
                key={eventId || index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {/* TITLE */}
                <h3 className="text-xl font-bold">
                  {event.title || event.eventTitle}
                </h3>

                {/* DATE */}
                <p className="text-gray-500 text-sm mt-2">
                  📅{" "}
                  {eventDate
                    ? eventDate.toLocaleDateString("en-IN")
                    : "Date not available"}
                </p>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mt-3">
                  {event.description || "No description"}
                </p>

                {/* STATUS */}
                <span className="inline-block mt-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Registered
                </span>

                {/* ✅ GIVE FEEDBACK BUTTON */}
                <button
                  onClick={() => navigate(`/student/feedback/${eventId}`)}
                  className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Give Feedback
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentRegisteredEventPage;