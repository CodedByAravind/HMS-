import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("doctor/profile/")
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

    api.get("doctor/appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

    api.get("doctor/patients/")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));

  }, []);


  const cancelAppointment = (id) => {

    if (!window.confirm("Cancel this appointment?")) return;

    api.post(`appointments/${id}/cancel/`)
      .then(() => {
        setAppointments(appointments.filter(a => a.id !== id));
      })
      .catch(err => console.log(err));

  };


  return (
    <div>

      <Navbar role="doctor" />

      <div style={{ padding: "40px" }}>

        {/* Header */}

        <div style={header}>

          <h2 style={title}>
            Welcome Dr. {doctor?.first_name} {doctor?.last_name}
          </h2>

          <button
            style={editBtn}
            onClick={() => navigate(`/update-doctor/${doctor?.id}`)}
          >
            Edit Profile
          </button>

        </div>


        {/* Upcoming Appointments */}

        <div style={card}>

          <div style={blueHeader}>
            Upcoming Appointments
          </div>

          <table style={table}>

            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {appointments.length > 0 ? (

                appointments.map((a,index) => (

                  <tr key={a.id}>

                    <td>{index + 1}</td>

                    <td>
                      {a.patient.user.first_name} {a.patient.user.last_name}
                    </td>

                    <td>{a.date}</td>

                    <td>{a.time}</td>

                    <td>

                      <button
                        style={updateBtn}
                        onClick={() => navigate(`/update-history/${a.id}`)}
                      >
                        Update & Complete
                      </button>

                      <button
                        style={cancelBtn}
                        onClick={() => cancelAppointment(a.id)}
                      >
                        Cancel
                      </button>

                      <button
                        style={historyBtn}
                        onClick={() => navigate(`/history/${a.patient.id}`)}
                      >
                        View History
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5" style={noData}>
                    No Appointments
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Assigned Patients */}

        <div style={card}>

          <div style={grayHeader}>
            Assigned Patients
          </div>

          <div>

            {patients.length > 0 ? (

              patients.map(p => (

                <div key={p.id} style={patientRow}>

                  <span>
                    {p.user.first_name} {p.user.last_name}
                  </span>

                  <button
                    style={historyBtn}
                    onClick={() => navigate(`/history/${p.id}`)}
                  >
                    View History
                  </button>

                </div>

              ))

            ) : (

              <p style={noData}>
                No patients assigned.
              </p>

            )}

          </div>

        </div>


        {/* Provide Availability */}

        <div style={centerActions}>

          <button
            style={updateBtn}
            onClick={() => navigate("/availability")}
          >
            Provide Availability
          </button>

        </div>

      </div>

    </div>
  );
}


const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const title = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#003366"
};

const editBtn = {
  background: "#ffc107",
  padding: "8px 14px",
  borderRadius: "6px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer"
};

const card = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  marginBottom: "25px",
  overflow: "hidden"
};

const blueHeader = {
  padding: "10px 16px",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#0276ff",
  color: "#fff"
};

const grayHeader = {
  padding: "10px 16px",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#6c757d",
  color: "#fff"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const updateBtn = {
  background: "#198754",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  marginRight: "6px",
  border: "none",
  cursor: "pointer"
};

const cancelBtn = {
  background: "#e63946",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  marginRight: "6px",
  border: "none",
  cursor: "pointer"
};

const historyBtn = {
  border: "2px solid #0276ff",
  color: "#0276ff",
  padding: "6px 12px",
  borderRadius: "6px",
  background: "transparent",
  cursor: "pointer"
};

const patientRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  borderBottom: "1px solid #eee"
};

const centerActions = {
  textAlign: "center",
  marginBottom: "20px"
};

const noData = {
  textAlign: "center",
  padding: "15px",
  color: "#777"
};

export default DoctorDashboard;