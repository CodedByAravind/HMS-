import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Departments() {

  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Departments</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {departments.map(dep => (
            <tr key={dep.id}>

              <td>{dep.name}</td>

              <td>
                <button
                  onClick={() => navigate(`/doctors/${dep.id}`)}
                >
                  View Doctors
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Departments;