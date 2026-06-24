import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>BookFlow</h1>
      <p>Modern appointment booking system for SMEs</p>

      <Link to="/book">
        <button className="btn">Book Appointment</button>
      </Link>
    </div>
  );
}
