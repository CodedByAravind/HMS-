import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function UpdateHistory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);

  const [visitType, setVisitType] = useState("");
  const [test, setTest] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [medicines, setMedicines] = useState("");

  useEffect(() => {

    api.get(`appointments/${id}/`)
      .then(res => setAppointment(res.data))
      .catch(err => console.log(err));

  }, [id]);

  const submit = () => {

    api.post("history/", {
      appointment: id,
      visit_type: visitType,
      test_done: test,
      diagnosis: diagnosis,
      prescription: prescription,
      medicines: medicines
    })
    .then(() => {
      alert("Appointment completed");
      navigate("/doctor");
    })
    .catch(err => console.log(err));

  };

  if (!appointment) return <p>Loading...</p>;

  return (

    <div>

      <Navbar role="doctor"/>

      <div style={container}>

        {/* Back button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={backBtn} onClick={() => navigate("/doctor")}>
            Back
          </button>
        </div>

        <h3 style={title}>Update Patient History</h3>

        {/* Patient Info */}
        <p style={info}>
          <strong>Patient:</strong> {appointment.patient.user.first_name} {appointment.patient.user.last_name}
        </p>

        <p style={info}>
          <strong>Department:</strong> {appointment.doctor.department.name}
        </p>

        {/* Form */}

        <label>Visit Type</label>
        <select style={input} onChange={(e)=>setVisitType(e.target.value)}>
          <option value="">Select Visit Type</option>
          <option value="Online">Online</option>
          <option value="In-Person">In-Person</option>
          <option value="Follow-Up">Follow-Up</option>
        </select>

        <label>Test Done</label>
        <input
          style={input}
          onChange={(e)=>setTest(e.target.value)}
        />

        <label>Diagnosis</label>
        <textarea
          style={textarea}
          onChange={(e)=>setDiagnosis(e.target.value)}
        />

        <label>Prescription</label>
        <textarea
          style={textarea}
          onChange={(e)=>setPrescription(e.target.value)}
        />

        <label>Medicines</label>
        <textarea
          style={textarea}
          placeholder="Medicine1 1-0-1, Medicine2 0-1-1"
          onChange={(e)=>setMedicines(e.target.value)}
        />

        <div style={{ textAlign: "right" }}>
          <button style={submitBtn} onClick={submit}>
            Complete Appointment
          </button>
        </div>

      </div>

    </div>
  );
}

const container = {
  maxWidth: "800px",
  margin: "20px auto",
  background: "#fff",
  padding: "22px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.12)"
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "18px",
  color: "#005bbb"
};

const info = {
  fontSize: "15px",
  marginBottom: "10px"
};

const input = {
  width: "100%",
  border: "1px solid #c9cdd2",
  borderRadius: "8px",
  padding: "10px",
  fontSize: "15px",
  marginBottom: "14px"
};

const textarea = {
  width: "100%",
  border: "1px solid #c9cdd2",
  borderRadius: "8px",
  padding: "10px",
  fontSize: "15px",
  marginBottom: "14px",
  height: "80px"
};

const submitBtn = {
  background: "#198754",
  color: "white",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const backBtn = {
  background: "#6c757d",
  color: "white",
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

export default UpdateHistory;