import { useState } from "react";
import api from "../services/api";

function DoctorAvailability() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const submitAvailability = () => {

    api.post("availability/", {
      date: date,
      time: time
    })
    .then(() => {
      alert("Availability added");
    })
    .catch(err => console.log(err));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Provide Availability</h2>

      <div>
        <label>Date</label>
        <br />
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Time</label>
        <br />
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={submitAvailability}
      >
        Save
      </button>

    </div>

  );
}

export default DoctorAvailability;