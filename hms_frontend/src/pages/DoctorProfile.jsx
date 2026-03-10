import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function DoctorProfile() {

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    api.get(`doctors/${id}/`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>

      <h2>
        Dr. {doctor.user.first_name} {doctor.user.last_name}
      </h2>

      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>

      <button
        onClick={() => navigate(`/availability/${doctor.id}`)}
      >
        Check Availability
      </button>

    </div>
  );
}

export default DoctorProfile;