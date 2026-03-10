import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api.get("doctor/appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div>

      <Navbar role="doctor" />

      <div style={{ padding: "40px" }}>

        <h2>Doctor Dashboard</h2>

        <button onClick={() => navigate("/availability")}>
          Provide Availability
        </button>

        <h3 style={{ marginTop: "30px" }}>
          Upcoming Appointments
        </h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>History</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map(a => (
              <tr key={a.id}>

                <td>
                  {a.patient.user.first_name} {a.patient.user.last_name}
                </td>

                <td>{a.date}</td>

                <td>{a.time}</td>

                <td>
                  <button
                    onClick={() => navigate(`/history/${a.patient.id}`)}
                  >
                    View
                  </button>
                </td>

                <td>

                  <button
                    onClick={() => navigate(`/update-history/${a.id}`)}
                  >
                    Update
                  </button>

                  <button style={{ marginLeft: "10px" }}>
                    Mark Complete
                  </button>

                  <button style={{ marginLeft: "10px" }}>
                    Cancel
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DoctorDashboard;