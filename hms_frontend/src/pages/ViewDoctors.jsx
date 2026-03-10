import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewDoctors() {

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("doctors/")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteDoctor = (id) => {

    api.delete(`doctors/${id}/`)
      .then(() => {
        setDoctors(doctors.filter(d => d.id !== id));
      })
      .catch(err => console.log(err));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Doctors</h2>

      <button onClick={() => navigate("/add-doctor")}>
        Add Doctor
      </button>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {doctors.map(d => (
            <tr key={d.id}>

              <td>
                Dr. {d.user.first_name} {d.user.last_name}
              </td>

              <td>{d.department.name}</td>

              <td>

                <button
                  onClick={() => navigate(`/update-doctor/${d.id}`)}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteDoctor(d.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ViewDoctors;