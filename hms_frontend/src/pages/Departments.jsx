import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function Departments() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    api.get(`departments/${id}/`)
      .then(res => setDepartment(res.data))
      .catch(err => console.log(err));

    api.get(`doctors/?department=${id}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

  }, [id]);

  if (!department) return <p>Loading...</p>;

  return (

    <div style={container}>

      {/* Header */}

      <div style={headerRow}>

        <h2 style={title}>{department.name}</h2>

        <div>

          <button
            style={historyBtn}
            onClick={() => navigate(`/history/${id}`)}
          >
            History
          </button>

          <button
            style={backBtn}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>

        </div>

      </div>


      {/* Overview */}

      <div style={card}>

        <h3 style={sectionTitle}>Overview</h3>

        <p style={{color:"#666"}}>
          {department.description || "No description available."}
        </p>

      </div>


      {/* Doctors */}

      <div style={card}>

        <h3 style={sectionTitle}>Doctors' List</h3>

        {doctors.length > 0 ? (

          doctors.map(doc => (

            <div key={doc.id} style={doctorItem}>

              <span style={doctorName}>
                Dr. {doc.user.first_name} {doc.user.last_name}
                {doc.experience && ` (Exp: ${doc.experience} yrs)`}
              </span>

              <div>

                <button
                  style={checkBtn}
                  onClick={() => navigate(`/availability/${doc.id}`)}
                >
                  Check Availability
                </button>

                <button
                  style={viewBtn}
                  onClick={() => navigate(`/doctor/${doc.id}`)}
                >
                  View Details
                </button>

              </div>

            </div>

          ))

        ) : (

          <p style={{textAlign:"center", color:"#777"}}>
            No doctors found in this department.
          </p>

        )}

      </div>

    </div>

  );
}

const container = {
  maxWidth: "900px",
  margin: "25px auto"
}

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
}

const title = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#003366"
}

const card = {
  background: "#fff",
  borderRadius: "10px",
  padding: "18px",
  marginTop: "18px",
  border: "1px solid #dcdcdc"
}

const sectionTitle = {
  fontSize: "19px",
  fontWeight: "700",
  color: "#003d80",
  marginBottom: "10px"
}

const doctorItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #e4e4e4",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px"
}

const doctorName = {
  fontWeight: "700",
  color: "#003366"
}

const checkBtn = {
  color: "#0276ff",
  border: "2px solid #0276ff",
  background: "transparent",
  padding: "5px 12px",
  borderRadius: "6px",
  fontWeight: "600",
  marginRight: "5px",
  cursor: "pointer"
}

const viewBtn = {
  color: "#343a40",
  border: "2px solid #343a40",
  background: "transparent",
  padding: "5px 12px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer"
}

const historyBtn = {
  background: "#017bff",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "6px",
  marginRight: "6px",
  border: "none",
  cursor: "pointer"
}

const backBtn = {
  background: "#6c757d",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
}

export default Departments;