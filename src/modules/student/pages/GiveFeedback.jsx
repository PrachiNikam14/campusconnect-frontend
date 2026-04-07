import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitFeedback } from "../services/studentService";

const GiveFeedback = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rating: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating || !form.message) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      // ✅ USE YOUR SERVICE HERE
      await submitFeedback({
        eventId: Number(eventId),
        rating: Number(form.rating),
        message: form.message,
      });

      alert("✅ Feedback submitted!");

      navigate("/my-feedback");

    } catch (err) {
      alert(err.response?.data || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto shadow rounded">
      <h2 className="text-xl font-bold mb-4">Give Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <textarea
          name="message"
          placeholder="Write feedback..."
          value={form.message}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GiveFeedback;