import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function BookAppointment() {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const date = params.get("date");
  const time = params.get("time");

  const book = () => {

    api.post("appointments/", {
      doctor: id,
      date: date,
      time: time
    })
    .then(() => {
      alert("Appointment booked");
      navigate("/dashboard");
    })
    .catch(err => console.log(err));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Confirm Appointment</h2>

      <p>Doctor ID: {id}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>

      <button onClick={book}>
        Confirm Booking
      </button>

    </div>

  );
}

export default BookAppointment;