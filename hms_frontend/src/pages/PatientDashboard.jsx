import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [patient, setPatient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("patient/profile/")
      .then(res => setPatient(res.data))
      .catch(err => console.log(err));

    api.get("appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data))
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

      <Navbar role="patient" />

      <div style={container}>

        {/* Header */}

        <div style={header}>

          <h2 style={title}>
            Welcome {patient?.first_name} {patient?.last_name}
          </h2>

          <div>

            <button
              style={linkBtn}
              onClick={() => navigate("/profile")}
            >
              Edit Profile
            </button>

            <button
              style={linkBtn}
              onClick={() => navigate("/history")}
            >
              History
            </button>

          </div>

        </div>


        {/* Book Appointment */}

        <div style={{textAlign:"center", marginBottom:"30px"}}>

          <button
            style={mainBtn}
            onClick={() => navigate("/book")}
          >
            Book Appointment
          </button>

        </div>


        {/* Upcoming Appointments */}

        <div style={card}>

          <div style={headerBlue}>
            Upcoming Appointments
          </div>

          <table style={table}>

            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {appointments.length > 0 ? (

                appointments.map((a,index) => (

                  <tr key={a.id}>

                    <td>{index + 1}</td>

                    <td>
                      Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
                    </td>

                    <td>{a.doctor.department?.name}</td>

                    <td>{a.date}</td>

                    <td>{a.time}</td>

                    <td>

                      <button
                        style={cancelBtn}
                        onClick={() => cancelAppointment(a.id)}
                      >
                        Cancel
                      </button>

                      <button
                        style={rescheduleBtn}
                        onClick={() => navigate(`/book/${a.doctor.id}?reschedule=${a.id}`)}
                      >
                        Reschedule
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="6" style={noData}>
                    No upcoming appointments
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Departments */}

        <div style={card}>

          <div style={headerGray}>
            Departments
          </div>

          {departments.map(dep => (

            <div key={dep.id} style={deptRow}>

              <strong>{dep.name}</strong>

              <button
                style={viewDeptBtn}
                onClick={() => navigate(`/departments/${dep.id}`)}
              >
                View Details
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


const container = {
  maxWidth: "1100px",
  margin: "25px auto",
  background: "#fff",
  padding: "10px 20px",
  borderRadius: "10px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "22px"
};

const title = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#003366"
};

const linkBtn = {
  marginLeft: "10px",
  background: "transparent",
  border: "none",
  color: "#0276ff",
  fontWeight: "bold",
  cursor: "pointer"
};

const mainBtn = {
  background: "#198754",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const card = {
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.10)",
  marginBottom: "25px",
  overflow: "hidden"
};

const headerBlue = {
  background: "#005bbb",
  color: "#fff",
  padding: "12px 16px",
  fontWeight: "bold"
};

const headerGray = {
  background: "#6a6f7d",
  color: "#fff",
  padding: "12px 16px",
  fontWeight: "bold"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const cancelBtn = {
  background: "#e63946",
  color: "#fff",
  padding: "5px 12px",
  borderRadius: "6px",
  marginRight: "6px",
  border: "none",
  cursor: "pointer"
};

const rescheduleBtn = {
  background: "#0276ff",
  color: "#fff",
  padding: "5px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const deptRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #e0e0e0",
  alignItems: "center"
};

const viewDeptBtn = {
  border: "2px solid #0276ff",
  color: "#0276ff",
  padding: "5px 12px",
  borderRadius: "6px",
  background: "transparent",
  cursor: "pointer"
};

const noData = {
  textAlign: "center",
  color: "#777",
  padding: "12px"
};

export default PatientDashboard;