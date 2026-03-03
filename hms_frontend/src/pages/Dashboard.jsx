import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("appointments/")
      .then(res => {
        console.log(res.data);
        setAppointments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>
      <p>Appointments count: {appointments.length}</p>
    </div>
  );
}

export default Dashboard;