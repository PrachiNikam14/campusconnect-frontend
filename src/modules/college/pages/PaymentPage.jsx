import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [payment, setPayment] = useState({
    amount: "",
    transactionId: "",
  });

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const found = events.find((e) => e.id === Number(id));
    setEvent(found);
  }, [id]);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let events = JSON.parse(localStorage.getItem("events")) || [];

    const updated = events.map((e) =>
      e.id === Number(id)
        ? { ...e, status: "APPROVED" }
        : e
    );

    localStorage.setItem("events", JSON.stringify(updated));

    alert("Payment successful! Event confirmed.");

    navigate("/college/dashboard");
  };

  if (!event) return <p className="p-6">Event not found</p>;

  return (
    <div className="section">

      <h2 className="section-title text-grad-primary mb-6">
        Event Payment
      </h2>

      <div className="card p-6 max-w-xl">

        <h3 className="text-lg font-semibold mb-4">
          {event.title}
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              className="input mt-1"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              className="input mt-1"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-primary w-full">
            Pay & Confirm
          </button>

        </form>

      </div>

    </div>
  );
}

export default PaymentPage;