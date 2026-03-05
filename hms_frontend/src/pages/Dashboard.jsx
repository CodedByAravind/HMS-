import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("appointments/")
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/book")}>
        Book Appointment
      </button>

      <h3 style={{ marginTop: "30px" }}>Appointments</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>
                Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
              </td>
              <td>
                {a.patient.user.first_name} {a.patient.user.last_name}
              </td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;