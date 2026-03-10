import { useEffect, useState } from "react";
import api from "../services/api";

function ViewPatients() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {

    api.get("patients/")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div style={{ padding: "40px" }}>

      <h2>Registered Patients</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>

          {patients.map(p => (
            <tr key={p.id}>

              <td>
                {p.user.first_name} {p.user.last_name}
              </td>

              <td>{p.phone}</td>

              <td>{p.age}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ViewPatients;