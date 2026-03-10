import { useEffect, useState } from "react";
import api from "../services/api";

function ViewAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    api.get("appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div style={{ padding: "40px" }}>

      <h2>Appointments</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map(a => (
            <tr key={a.id}>

              <td>
                {a.patient.user.first_name} {a.patient.user.last_name}
              </td>

              <td>
                Dr. {a.doctor.user.first_name} {a.doctor.user.last_name}
              </td>

              <td>{a.date}</td>

              <td>{a.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ViewAppointments;