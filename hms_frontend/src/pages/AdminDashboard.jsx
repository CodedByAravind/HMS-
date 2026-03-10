import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("doctors/")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

    api.get("patients/")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));

    api.get("appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div>

      <Navbar role="admin" />

      <div style={{ padding: "40px" }}>

        <h2>Admin Dashboard</h2>

        <button onClick={() => navigate("/add-doctor")}>
          Add Doctor
        </button>

        {/* Doctors */}

        <h3 style={{ marginTop: "30px" }}>Registered Doctors</h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {doctors.map(d => (
              <tr key={d.id}>

                <td>
                  Dr. {d.user.first_name} {d.user.last_name}
                </td>

                <td>{d.department.name}</td>

                <td>

                  <button
                    onClick={() => navigate(`/update-doctor/${d.id}`)}
                  >
                    Edit
                  </button>

                  <button style={{ marginLeft: "10px" }}>
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>


        {/* Patients */}

        <h3 style={{ marginTop: "30px" }}>Registered Patients</h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>

            {patients.map(p => (
              <tr key={p.id}>

                <td>
                  {p.user.first_name} {p.user.last_name}
                </td>

                <td>{p.phone}</td>

              </tr>
            ))}

          </tbody>

        </table>


        {/* Appointments */}

        <h3 style={{ marginTop: "30px" }}>Upcoming Appointments</h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map(a => (
              <tr key={a.id}>

                <td>
                  {a.patient.user.first_name} {a.patient.user.last_name}
                </td>

                <td>
                  Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
                </td>

                <td>{a.date}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;