import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function DoctorAvailability() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState({});

  const [days, setDays] = useState([]);

  useEffect(() => {

    api.get(`doctors/${id}/`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

    api.get(`availability/${id}/`)
      .then(res => setAvailability(res.data))
      .catch(err => console.log(err));

    generateDays();

  }, [id]);


  const generateDays = () => {

    const next7 = [];

    for (let i = 0; i < 7; i++) {

      const d = new Date();
      d.setDate(d.getDate() + i);

      const dateStr = d.toISOString().split("T")[0];

      next7.push({
        label: d.toLocaleDateString(),
        value: dateStr
      });

    }

    setDays(next7);
  };


  const book = (date,time) => {

    navigate(`/book/${id}?date=${date}&time=${time}`);

  };


  if (!doctor) return <p>Loading...</p>;


  return (

    <div style={container}>

      {/* Header */}

      <div style={header}>

        <h3 style={title}>
          Availability - Dr. {doctor.user.first_name} {doctor.user.last_name}
        </h3>

        <button
          style={backBtn}
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

      </div>


      {/* Table */}

      <table style={table}>

        <thead>
          <tr>
            <th>Date</th>
            <th>Morning (10:00 AM)</th>
            <th>Evening (04:00 PM)</th>
          </tr>
        </thead>

        <tbody>

          {days.map(day => {

            const record = availability[day.value];

            return (

              <tr key={day.value}>

                <td><strong>{day.label}</strong></td>

                <td>

                  {record?.morning_available ? (

                    <button
                      style={bookBtn}
                      onClick={() => book(day.value,"10:00 AM")}
                    >
                      Book Slot
                    </button>

                  ) : (

                    <span style={notAvail}>Not Available</span>

                  )}

                </td>


                <td>

                  {record?.evening_available ? (

                    <button
                      style={bookBtn}
                      onClick={() => book(day.value,"04:00 PM")}
                    >
                      Book Slot
                    </button>

                  ) : (

                    <span style={notAvail}>Not Available</span>

                  )}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );
}


const container = {
  maxWidth: "900px",
  margin: "20px auto",
  background: "#fff",
  padding: "22px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.12)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px"
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#005bbb"
};

const backBtn = {
  background: "#6c757d",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const bookBtn = {
  background: "#198754",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const notAvail = {
  fontWeight: "600",
  color: "#dc3545"
};

export default DoctorAvailability;