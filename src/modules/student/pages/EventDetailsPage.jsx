import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEvent = async () => {
      try {
        const eventRes = await API.get(`/student/events/${id}`);
        if (!isMounted) return;

        setEvent(eventRes.data);
      } catch (err) {
        console.error("EVENT FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const res = await API.post(`/student/events/register/${id}`);
      alert(res.data || "Registered successfully!");

      setEvent((prev) =>
        prev ? { ...prev, registered: true } : prev
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Loading event details...</p>
      </div>
    );
  }

  // ✅ Not found
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-12 max-w-md bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Event Not Found
          </h2>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  // ✅ Derived states
  const eventDate = new Date(event.eventDate);
  const isPast = eventDate < new Date();
  const isPending = event.verificationStatus === "PENDING";
  const isRejected = event.verificationStatus === "REJECTED";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-purple-600 mb-8"
      >
        ← Back to Events
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3 mt-4">
              {event.registered && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  ✓ Registered
                </span>
              )}

              {isPast && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  📅 Past Event
                </span>
              )}

              {event.price === 0 && !isPast && (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                  🎉 Free
                </span>
              )}

              {/* ✅ STATUS BADGES */}
              {isPending && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  ⏳ Approval Pending
                </span>
              )}

              {isRejected && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  ❌ Rejected
                </span>
              )}
            </div>

            {/* WARNING */}
            {isPending && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                Your account is pending approval. You cannot register for events.
              </div>
            )}

            {isRejected && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Your account has been rejected. Contact admin.
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailCard emoji="📅" title="Date & Time">
              {eventDate.toLocaleString("en-IN")}
            </DetailCard>

            <DetailCard emoji="💰" title="Price">
              {event.price > 0 ? `₹${event.price}` : "Free"}
            </DetailCard>

            <DetailCard emoji="👥" title="Capacity">
              {event.maxParticipants || "Unlimited"}
            </DetailCard>

            <DetailCard emoji="📍" title="Location">
              {event.location || "TBA"}
            </DetailCard>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-center mb-4">
              {event.registered ? "You're In!" : "Join This Event"}
            </h3>

            {/* BUTTON STATES */}
            {event.registered ? (
              <div className="text-center py-4 bg-green-50 text-green-700 rounded-xl">
                Already Registered
              </div>
            ) : isPending ? (
              <div className="text-center py-4 bg-yellow-50 text-yellow-700 rounded-xl">
                Approval Pending
              </div>
            ) : isRejected ? (
              <div className="text-center py-4 bg-red-50 text-red-700 rounded-xl">
                Not Allowed
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={registering || isPast}
                className={`w-full py-4 rounded-xl text-white font-bold ${
                  isPast
                    ? "bg-gray-300"
                    : "bg-gradient-to-r from-purple-600 to-pink-500"
                }`}
              >
                {registering
                  ? "Registering..."
                  : isPast
                  ? "Event Ended"
                  : "Register Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// DETAIL CARD
const DetailCard = ({ emoji, title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 flex gap-4">
    <div className="text-xl">{emoji}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-bold">{children}</p>
    </div>
  </div>
);

export default EventDetailsPage;