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
    <div className="min-h-[93dvh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      
      {/* Background blur blobs (same style as register) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Book Appointment
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Schedule your service easily
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-5">

          {/* Service */}
          <select
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none hover:border-gray-400 transition"
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Employee */}
          <select
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none hover:border-gray-400 transition"
            onChange={(e) => setForm({ ...form, employee: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none hover:border-gray-400 transition"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          {/* Time */}
          <select
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none hover:border-gray-400 transition"
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          >
            <option value="">Select Time</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Button */}
          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg transition"
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
}