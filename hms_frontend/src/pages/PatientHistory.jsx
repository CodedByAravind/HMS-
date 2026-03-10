import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function PatientHistory() {

  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {

    api.get(`history/${id}/`)
      .then(res => setHistory(res.data))
      .catch(err => console.log(err));

  }, [id]);

  return (

    <div style={{ padding: "40px" }}>

      <h2>Patient History</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Visit</th>
            <th>Test</th>
            <th>Diagnosis</th>
            <th>Prescription</th>
          </tr>
        </thead>

        <tbody>

          {history.map(h => (
            <tr key={h.id}>

              <td>{h.visit_type}</td>
              <td>{h.test_done}</td>
              <td>{h.diagnosis}</td>
              <td>{h.prescription}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default PatientHistory;