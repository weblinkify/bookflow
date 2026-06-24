import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    customerId: "",
    serviceId: "",
    employeeId: ""
  });

  const submit = async () => {
    await axios.post("http://localhost:4000/api/appointments", form);
    alert("Booked!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Book Appointment</h2>

      <input placeholder="Date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Time" onChange={e => setForm({ ...form, time: e.target.value })} />

      <button onClick={submit}>Confirm</button>
    </div>
  );
}
