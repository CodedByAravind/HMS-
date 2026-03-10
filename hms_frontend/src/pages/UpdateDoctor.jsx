import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function UpdateDoctor() {

  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    api.get(`doctors/${id}/`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

  }, [id]);

  const update = () => {

    api.put(`doctors/${id}/`, doctor)
      .then(() => {
        alert("Doctor updated");
        navigate("/admin");
      })
      .catch(err => console.log(err));

  };

  if (!doctor) return <p>Loading...</p>;

  return (

    <div style={{ padding: "40px" }}>

      <h2>Update Doctor</h2>

      <input
        value={doctor.specialization}
        onChange={(e) =>
          setDoctor({ ...doctor, specialization: e.target.value })
        }
      />

      <br /><br />

      <button onClick={update}>
        Save
      </button>

    </div>

  );
}

export default UpdateDoctor;