import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function UpdateHistory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState("");
  const [test, setTest] = useState("");
  const [prescription, setPrescription] = useState("");

  const submit = () => {

    api.post("history/", {
      appointment: id,
      diagnosis: diagnosis,
      test_done: test,
      prescription: prescription
    })
    .then(() => {
      alert("History updated");
      navigate("/doctor");
    })
    .catch(err => console.log(err));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Update Patient History</h2>

      <div>
        <label>Test Done</label>
        <br />
        <input
          onChange={(e) => setTest(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Diagnosis</label>
        <br />
        <input
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Prescription</label>
        <br />
        <textarea
          onChange={(e) => setPrescription(e.target.value)}
        />
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={submit}
      >
        Save
      </button>

    </div>

  );
}

export default UpdateHistory;