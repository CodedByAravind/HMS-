import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function DoctorList() {

  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api.get(`doctors/?department=${id}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

  }, [id]);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Doctors</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {doctors.map(doc => (
            <tr key={doc.id}>

              <td>
                Dr. {doc.user.first_name} {doc.user.last_name}
              </td>

              <td>{doc.specialization}</td>

              <td>

                <button
                  onClick={() => navigate(`/doctor/${doc.id}`)}
                >
                  View Profile
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DoctorList;