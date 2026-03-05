import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("doctors/")
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("appointments/create/", {
        doctor_id: doctorId,
        patient_id: 1,
        date: date,
        time: time
        });

      alert("Appointment booked successfully");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Select Doctor</label>
          <br />
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <option value="">Choose Doctor</option>

            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.user.first_name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Date</label>
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Time</label>
          <br />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Book Appointment</button>

      </form>
    </div>
  );
}

export default BookAppointment;