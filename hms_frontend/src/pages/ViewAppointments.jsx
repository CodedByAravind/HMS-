import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ViewAppointments() {

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api.get("appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

  }, []);

  const upcoming = appointments.filter(a => a.status === "BOOKED");
  const completed = appointments.filter(a => a.status === "COMPLETED");
  const cancelled = appointments.filter(a => a.status === "CANCELLED");

  const renderTable = (data, badgeClass, badgeText) => {

    if (data.length === 0) {
      return <p style={noData}>No appointments.</p>;
    }

    return (
      <table style={table}>
        <thead style={thead}>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a, index) => (
            <tr key={a.id} style={row}>
              <td>{index + 1}</td>

              <td>
                {a.patient.user.first_name} {a.patient.user.last_name}
              </td>

              <td>
                Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
              </td>

              <td>
                {a.doctor.department?.name || "N/A"}
              </td>

              <td>{a.date}</td>

              <td>{a.time}</td>

              <td>
                <span style={badgeClass}>{badgeText}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (

    <div>

      <Navbar role="admin"/>

      <div style={container}>

        <div style={header}>
          <h3>All Appointments</h3>

          <button style={backBtn} onClick={() => navigate("/admin")}>
            Back
          </button>
        </div>


        {/* Upcoming */}

        <h4 style={blueTitle}>Upcoming Appointments</h4>

        {renderTable(upcoming, badgeBooked, "Booked")}

        <hr />


        {/* Completed */}

        <h4 style={greenTitle}>Completed Appointments</h4>

        {renderTable(completed, badgeCompleted, "Completed")}

        <hr />


        {/* Cancelled */}

        <h4 style={redTitle}>Cancelled Appointments</h4>

        {renderTable(cancelled, badgeCancelled, "Cancelled")}

      </div>

    </div>
  );
}


/* Styles */

const container = {
  width: "88%",
  maxWidth: "1100px",
  margin: "20px auto"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const backBtn = {
  background: "gray",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const blueTitle = { color: "#0d6efd", marginBottom: "10px" };
const greenTitle = { color: "#198754", marginBottom: "10px" };
const redTitle = { color: "#d63333", marginBottom: "10px" };

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const thead = {
  background: "#d9ebff"
};

const row = {
  borderBottom: "1px solid #e1e1e1"
};

const badgeBooked = {
  background: "#ffc107",
  padding: "4px 10px",
  borderRadius: "6px",
  fontWeight: "600"
};

const badgeCompleted = {
  background: "#198754",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "6px",
  fontWeight: "600"
};

const badgeCancelled = {
  background: "#d63333",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "6px",
  fontWeight: "600"
};

const noData = {
  textAlign: "center",
  color: "#666",
  marginBottom: "20px"
};

export default ViewAppointments;