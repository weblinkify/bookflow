import { useState } from "react";

export default function Booking() {
  const [form, setForm] = useState({
    service: "",
    employee: "",
    date: "",
    time: ""
  });

  const services = ["Haircut", "Massage", "Consultation"];
  const employees = ["John", "Anna", "Mike"];
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00"];

  const submit = () => {
    alert("Booking Confirmed 🎉");
    console.log(form);
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Book Appointment</h1>

        <div className="form">

          <select onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Select Service</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select onChange={(e) => setForm({ ...form, employee: e.target.value })}>
            <option>Select Employee</option>
            {employees.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select onChange={(e) => setForm({ ...form, time: e.target.value })}>
            <option>Select Time</option>
            {times.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button className="btn" onClick={submit}>
            Confirm Booking
          </button>

        </div>

      </div>
    </div>
  );
}
