import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function PatientHistory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [patient, setPatient] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [dept, setDept] = useState("");
  const [doctor, setDoctor] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {

    api.get(`patients/${id}/`)
      .then(res => setPatient(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data));

    api.get("doctors/")
      .then(res => setDoctors(res.data));

    loadHistory();

  }, [id]);


  const loadHistory = () => {

    api.get(`history/${id}/`, {
      params: { dept, doctor, from, to }
    })
      .then(res => setHistory(res.data))
      .catch(err => console.log(err));

  };


  const resetFilters = () => {
    setDept("");
    setDoctor("");
    setFrom("");
    setTo("");
    loadHistory();
  };


  return (

    <div style={container}>

      {/* Header */}

      <div style={header}>

        <h2 style={title}>Patient History</h2>

        <button
          style={backBtn}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </div>


      {/* Patient Info */}

      {patient && (

        <div style={patientCard}>

          <p><strong>Name:</strong> {patient.user.first_name} {patient.user.last_name}</p>
          <p><strong>Email:</strong> {patient.user.email}</p>
          <p><strong>Phone:</strong> {patient.phone || "Not Provided"}</p>
          <p><strong>Address:</strong> {patient.address || "Not Provided"}</p>

        </div>

      )}


      {/* Filters */}

      <div style={filterBox}>

        <div style={filterRow}>

          <div>

            <label>Department</label>

            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >

              <option value="">All</option>

              {departments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label>Doctor</label>

            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >

              <option value="">All</option>

              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  Dr. {d.user.first_name} {d.user.last_name}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label>From</label>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

          </div>


          <div>

            <label>To</label>

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

          </div>

        </div>


        <div style={filterActions}>

          <button
            style={applyBtn}
            onClick={loadHistory}
          >
            Apply Filter
          </button>

          <button
            style={resetBtn}
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>

      </div>


      {/* History Table */}

      {history.length > 0 ? (

        <table style={table}>

          <thead>

            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Department</th>
              <th>Visit Type</th>
              <th>Doctor</th>
              <th>View</th>
            </tr>

          </thead>

          <tbody>

            {history.map((h,index) => (

              <tr key={h.id}>

                <td>{index + 1}</td>

                <td>{h.appointment.date}</td>

                <td>{h.appointment.time}</td>

                <td>{h.appointment.doctor.department.name}</td>

                <td>{h.visit_type}</td>

                <td>
                  Dr. {h.appointment.doctor.user.first_name} {h.appointment.doctor.user.last_name}
                </td>

                <td>

                  <button
                    style={viewBtn}
                    onClick={() => navigate(`/appointment/${h.appointment.id}`)}
                  >
                    View Details
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      ) : (

        <p style={noData}>No previous visits found.</p>

      )}

    </div>

  );
}


const container = {
  maxWidth: "1100px",
  margin: "25px auto"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px"
};

const title = {
  fontSize: "30px",
  fontWeight: "800"
};

const backBtn = {
  background: "#6c757d",
  color: "#fff",
  padding: "8px 20px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const patientCard = {
  background: "#fff",
  padding: "16px 20px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  marginBottom: "20px"
};

const filterBox = {
  background: "#fff",
  padding: "22px 25px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  marginBottom: "20px"
};

const filterRow = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "15px"
};

const filterActions = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "12px",
  gap: "12px"
};

const applyBtn = {
  background: "#0276ff",
  color: "#fff",
  padding: "7px 22px",
  borderRadius: "6px",
  border: "none"
};

const resetBtn = {
  border: "1px solid #555",
  padding: "6px 18px",
  borderRadius: "6px",
  background: "#fff"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const viewBtn = {
  border: "2px solid #0276ff",
  color: "#0276ff",
  padding: "6px 14px",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer"
};

const noData = {
  textAlign: "center",
  fontWeight: "600",
  color: "#777"
};

export default PatientHistory;