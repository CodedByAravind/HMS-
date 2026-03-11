import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function DoctorAvailability() {

  const navigate = useNavigate();

  const [days, setDays] = useState([]);
  const [availability, setAvailability] = useState({});

  useEffect(() => {

    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      const dateStr = d.toISOString().split("T")[0];

      next7Days.push({
        label: d.toLocaleDateString(),
        value: dateStr
      });
    }

    setDays(next7Days);

  }, []);


  const toggleAvailability = (date, period) => {

    setAvailability(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [period]: !prev[date]?.[period]
      }
    }));

  };


  const saveAvailability = () => {

    api.post("availability/create/", availability)
      .then(() => {
        alert("Availability saved");
        navigate("/doctor");
      })
      .catch(err => console.log(err));

  };


  return (

    <div style={container}>

      <h2 style={title}>Doctor's Availability</h2>

      <table style={table}>

        <thead>
          <tr>
            <th>Date</th>
            <th>Morning (08:00 AM - 12:00 PM)</th>
            <th>Evening (04:00 PM - 09:00 PM)</th>
          </tr>
        </thead>

        <tbody>

          {days.map(day => (

            <tr key={day.value}>

              <td><strong>{day.label}</strong></td>

              <td>

                <label style={checkRow}>

                  <input
                    type="checkbox"
                    checked={availability[day.value]?.morning || false}
                    onChange={() =>
                      toggleAvailability(day.value, "morning")
                    }
                  />

                  <span style={availableText}>Available</span>

                </label>

              </td>

              <td>

                <label style={checkRow}>

                  <input
                    type="checkbox"
                    checked={availability[day.value]?.evening || false}
                    onChange={() =>
                      toggleAvailability(day.value, "evening")
                    }
                  />

                  <span style={availableText}>Available</span>

                </label>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      <div style={actions}>

        <button style={saveBtn} onClick={saveAvailability}>
          Save
        </button>

        <button style={cancelBtn} onClick={() => navigate("/doctor")}>
          Cancel
        </button>

      </div>

    </div>
  );
}


const container = {
  maxWidth: "1100px",
  margin: "30px auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 12px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#005bbb"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const checkRow = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px"
};

const availableText = {
  color: "#198754",
  fontWeight: "600"
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  marginTop: "20px"
};

const saveBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "10px 28px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer"
};

const cancelBtn = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px 28px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer"
};

export default DoctorAvailability;