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


  const deleteDoctor = (id) => {

    if (!window.confirm("Delete this doctor?")) return;

    api.delete(`doctors/${id}/`)
      .then(() => {
        setDoctors(doctors.filter(d => d.id !== id));
      })
      .catch(err => console.log(err));

  };


  const deletePatient = (id) => {

    if (!window.confirm("Delete this patient?")) return;

    api.delete(`patients/${id}/`)
      .then(() => {
        setPatients(patients.filter(p => p.id !== id));
      })
      .catch(err => console.log(err));

  };


  const blacklistUser = (id) => {

    api.post(`blacklist/${id}/`)
      .then(() => {
        alert("User blacklisted");
      })
      .catch(err => console.log(err));

  };


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
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {doctors.map((d,index) => (
              <tr key={d.id}>

                <td>{index + 1}</td>

                <td>
                  Dr. {d.user.first_name} {d.user.last_name}
                </td>

                <td>{d.department?.name}</td>

                <td>

                  <button
                    onClick={() => navigate(`/doctor/${d.id}`)}
                  >
                    View
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => navigate(`/update-doctor/${d.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteDoctor(d.id)}
                  >
                    Delete
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => blacklistUser(d.user.id)}
                  >
                    Blacklist
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
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((p,index) => (
              <tr key={p.id}>

                <td>{index + 1}</td>

                <td>
                  {p.user.first_name} {p.user.last_name}
                </td>

                <td>{p.phone}</td>

                <td>

                  <button
                    onClick={() => navigate(`/history/${p.id}`)}
                  >
                    View
                  </button>

                  <button style={{ marginLeft: "5px" }}>
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deletePatient(p.id)}
                  >
                    Delete
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => blacklistUser(p.user.id)}
                  >
                    Blacklist
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>



        {/* Appointments */}

        <h3 style={{ marginTop: "30px" }}>Upcoming Appointments</h3>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a,index) => (
              <tr key={a.id}>

                <td>{index + 1}</td>

                <td>
                  {a.patient.user.first_name} {a.patient.user.last_name}
                </td>

                <td>
                  Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
                </td>

                <td>{a.date}</td>

                <td>

                  <button
                    onClick={() => navigate(`/appointment/${a.id}`)}
                  >
                    View
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

export default AdminDashboard;