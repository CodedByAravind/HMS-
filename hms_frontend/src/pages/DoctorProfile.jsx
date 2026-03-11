import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function DoctorProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {

    api.get(`doctors/${id}/`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

  }, [id]);


  const deleteDoctor = () => {

    if (!window.confirm("Delete this doctor?")) return;

    api.delete(`doctors/${id}/`)
      .then(() => {
        alert("Doctor deleted");
        navigate("/admin");
      })
      .catch(err => console.log(err));

  };


  const blacklistDoctor = () => {

    api.post(`blacklist/${doctor.user.id}/`)
      .then(() => {
        alert("Doctor blacklisted");
        navigate("/admin");
      })
      .catch(err => console.log(err));

  };


  if (!doctor) {
    return (
      <div style={{padding:"40px"}}>
        <p>Loading doctor details...</p>
      </div>
    );
  }

  return (

    <div style={container}>

      {/* Header */}

      <div style={header}>

        <h3 style={title}>Doctor Details</h3>

        <button
          style={backBtn}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </div>


      {/* Profile Card */}

      <div style={card}>

        <div style={row}>

          <div style={{ textAlign: "center" }}>

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="doctor"
              style={image}
            />

          </div>

          <div>

            <div style={name}>
              Dr. {doctor.user.first_name} {doctor.user.last_name}
            </div>

            <div style={text}>
              <strong>Specialization:</strong> {doctor.specialization || "N/A"}
            </div>

            <div style={text}>
              <strong>Experience:</strong> {doctor.experience || "N/A"}
            </div>

            <div style={text}>
              <strong>Registration ID:</strong> {doctor.reg_id || "N/A"}
            </div>

            <div style={text}>
              <strong>Department:</strong> {doctor.department?.name || "N/A"}
            </div>

            <div style={text}>
              <strong>Email:</strong> {doctor.user.email}
            </div>

          </div>

        </div>


        {/* Doctor actions */}

        {role === "doctor" && (

          <div style={actions}>

            <button
              style={editBtn}
              onClick={() => navigate(`/update-doctor/${doctor.id}`)}
            >
              Edit Profile
            </button>

            <button
              style={availBtn}
              onClick={() => navigate(`/availability/${doctor.id}`)}
            >
              Availability
            </button>

          </div>

        )}


        {/* Patient actions */}

        {role === "patient" && (

          <div style={actions}>

            <button
              style={bookBtn}
              onClick={() => navigate(`/book/${doctor.id}`)}
            >
              Book Appointment
            </button>

          </div>

        )}


        {/* Admin actions */}

        {role === "admin" && (

          <div style={actions}>

            <button
              style={editBtn}
              onClick={() => navigate(`/update-doctor/${doctor.id}`)}
            >
              Edit
            </button>

            <button
              style={deleteBtn}
              onClick={deleteDoctor}
            >
              Delete
            </button>

            <button
              style={blackBtn}
              onClick={blacklistDoctor}
            >
              Blacklist
            </button>

          </div>

        )}

      </div>

    </div>

  );
}


const container = {
  maxWidth: "650px",
  margin: "20px auto"
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

const card = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 0 10px rgba(0,0,0,0.12)"
};

const row = {
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const image = {
  width: "110px",
  height: "110px",
  borderRadius: "50%"
};

const name = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#003d80"
};

const text = {
  fontSize: "15px",
  margin: "6px 0"
};

const actions = {
  textAlign: "center",
  marginTop: "18px"
};

const editBtn = {
  background: "#ffc107",
  padding: "7px 16px",
  borderRadius: "6px",
  margin: "4px",
  border: "none"
};

const availBtn = {
  background: "#198754",
  color: "#fff",
  padding: "7px 16px",
  borderRadius: "6px",
  margin: "4px",
  border: "none"
};

const bookBtn = {
  background: "#0d6efd",
  color: "#fff",
  padding: "7px 16px",
  borderRadius: "6px",
  margin: "4px",
  border: "none"
};

const deleteBtn = {
  background: "#dc3545",
  color: "#fff",
  padding: "7px 16px",
  borderRadius: "6px",
  margin: "4px",
  border: "none"
};

const blackBtn = {
  background: "#000",
  color: "#fff",
  padding: "7px 16px",
  borderRadius: "6px",
  margin: "4px",
  border: "none"
};

export default DoctorProfile;