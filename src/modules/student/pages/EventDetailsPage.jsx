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

    const fetchData = async () => {
      try {
        const eventRes = await API.get(`/student/events/${id}`);
        let registeredEvents = [];

        try {
          const regRes = await API.get(`/student/events/registered`);
          registeredEvents = regRes.data;
        } catch (err) {
          console.warn("Registered events fetch failed (likely auth issue)");
        }

        if (!isMounted) return;

        const evt = {
          ...eventRes.data,
          registered: registeredEvents.some((r) => r.id === eventRes.data.id),
        };
        setEvent(evt);
        setLoading(false);
      } catch (err) {
        console.error("EVENT FETCH ERROR:", err);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const res = await API.post(`/student/events/register/${id}`);
      alert(res.data);
      setEvent((prev) => ({ ...prev, registered: true }));
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
    setRegistering(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center">
        <div className="card p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Not Found</h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate("/events")} className="btn-primary">
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.eventDate);
  const isPast = eventDate < new Date();

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-purple-200/40 -top-48 -right-48 animate-blob"></div>
      <div className="blob w-80 h-80 bg-pink-200/30 top-1/2 -left-40 animate-blob-2"></div>
      <div className="blob w-64 h-64 bg-blue-200/30 bottom-20 right-20 animate-blob-3"></div>

      <div className="section relative z-10">
        <div className="section-inner py-8 px-4 sm:px-6 lg:px-12">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Events</span>
          </button>

          {/* Grid: main + sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Header card */}
              <div className="card p-8 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {/* Category badge */}
                  <span
                    className="badge"
                    style={{
                      background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
                      color: "#7c3aed",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse-dot"></span>
                    {event.category || "Event"}
                  </span>

                  {/* Status badges */}
                  {isPast && (
                    <span className="badge bg-gray-100 text-gray-600">
                      <span>📅</span> Past Event
                    </span>
                  )}
                  {event.registered && (
                    <span className="badge bg-green-50 text-green-700">
                      <span>✓</span> Registered
                    </span>
                  )}
                  {event.price === 0 && !isPast && (
                    <span className="badge bg-amber-50 text-amber-700">
                      <span>🎉</span> Free
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {event.title}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
              </div>

              {/* Details grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Date & Time */}
                <div className="card-glass p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
                    >
                      📅
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Date & Time
                      </p>
                      <p className="text-gray-900 font-bold">
                        {eventDate.toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-purple-600 font-semibold">
                        {eventDate.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="card-glass p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "linear-gradient(135deg, #fce7f3, #fbcfe8)" }}
                    >
                      💰
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Price
                      </p>
                      <p className="text-2xl font-extrabold text-grad-primary">
                        {event.price > 0 ? `₹${event.price}` : "Free"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="card-glass p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
                    >
                      👥
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Capacity
                      </p>
                      <p className="text-gray-900 font-bold">
                        {event.maxParticipants ? `${event.maxParticipants} spots` : "Unlimited"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="card-glass p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}
                    >
                      📍
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </p>
                      <p className="text-gray-900 font-bold">{event.location || "To be announced"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 flex flex-col mt-8 lg:mt-0">
              <div className="card p-6 w-full lg:sticky lg:top-24">
                <div className="text-center mb-6">
                  <div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4"
                    style={{ background: "var(--grad-hero)" }}
                  >
                    🎫
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.registered ? "You're In!" : "Join This Event"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {event.registered
                      ? "You're all set for this event"
                      : "Secure your spot now"}
                  </p>
                </div>

                {/* Price display */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Registration Fee</span>
                    <span className="text-2xl font-extrabold text-grad-primary">
                      {event.price > 0 ? `₹${event.price}` : "Free"}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                {!event.registered ? (
                  <button
                    onClick={handleRegister}
                    disabled={registering || isPast}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                      isPast
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                    style={
                      !isPast
                        ? { boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)" }
                        : {}
                    }
                  >
                    {registering ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Registering...
                      </span>
                    ) : isPast ? (
                      "Event Has Ended"
                    ) : (
                      "Register Now"
                    )}
                  </button>
                ) : (
                  <div className="w-full py-4 rounded-xl font-bold text-center bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Already Registered
                    </span>
                  </div>
                )}

                {/* Additional info */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Instant confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;