import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>BookFlow</h1>
      <p>Appointment booking system</p>

      <Link to="/book">
        <button>Book Appointment</button>
      </Link>
    </div>
  );
}
