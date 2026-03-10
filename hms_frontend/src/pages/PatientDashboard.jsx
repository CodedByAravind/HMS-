import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div>

      <Navbar role="patient" />

      <div style={{ padding: "40px" }}>

        <h2>Patient Dashboard</h2>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/book")}>
            Book Appointment
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>

        {/* Departments */}

        <h3>Departments</h3>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.map(dep => (
              <tr key={dep.id}>
                <td>{dep.name}</td>

                <td>
                  <button
                    onClick={() => navigate(`/doctors/${dep.id}`)}
                  >
                    View Doctors
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Appointments */}

        <h3 style={{ marginTop: "30px" }}>
          Upcoming Appointments
        </h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Doctor</th>
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

                <td>{a.date}</td>

                <td>{a.time}</td>

                <td>{a.status}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PatientDashboard;