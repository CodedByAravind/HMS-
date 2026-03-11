import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function UpdateDoctor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {

    api.get(`doctors/${id}/`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data))
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

    <div>

      <Navbar role="admin"/>

      <div style={container}>

        <button style={backBtn} onClick={() => navigate("/admin")}>
          Back
        </button>

        <h2 style={title}>Update Doctor</h2>

        <div style={form}>

          <label>First Name</label>
          <input
            style={input}
            value={doctor.user.first_name || ""}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                user: { ...doctor.user, first_name: e.target.value }
              })
            }
          />

          <label>Last Name</label>
          <input
            style={input}
            value={doctor.user.last_name || ""}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                user: { ...doctor.user, last_name: e.target.value }
              })
            }
          />

          <label>Specialization</label>
          <input
            style={input}
            value={doctor.specialization || ""}
            onChange={(e) =>
              setDoctor({ ...doctor, specialization: e.target.value })
            }
          />

          <label>Experience</label>
          <input
            style={input}
            value={doctor.experience || ""}
            onChange={(e) =>
              setDoctor({ ...doctor, experience: e.target.value })
            }
          />

          <label>Doctor Reg ID</label>
          <input
            style={input}
            value={doctor.reg_id || ""}
            onChange={(e) =>
              setDoctor({ ...doctor, reg_id: e.target.value })
            }
          />

          <label>Phone</label>
          <input
            style={input}
            value={doctor.phone || ""}
            onChange={(e) =>
              setDoctor({ ...doctor, phone: e.target.value })
            }
          />

          <label>Email</label>
          <input
            style={input}
            value={doctor.user.email || ""}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                user: { ...doctor.user, email: e.target.value }
              })
            }
          />

          <label>Department</label>
          <select
            style={input}
            value={doctor.department?.id || ""}
            onChange={(e) =>
              setDoctor({ ...doctor, department: e.target.value })
            }
          >
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <label>Username</label>
          <input
            style={input}
            value={doctor.user.username || ""}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                user: { ...doctor.user, username: e.target.value }
              })
            }
          />

          <label>Password</label>
          <input
            style={input}
            type="password"
            placeholder="Enter new password"
            onChange={(e) =>
              setDoctor({ ...doctor, password: e.target.value })
            }
          />

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button style={saveBtn} onClick={update}>
              Save
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

const container = {
  maxWidth: "800px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const title = {
  textAlign: "center",
  color: "#005bbb",
  marginBottom: "20px"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #b5b5b5"
};

const saveBtn = {
  background: "#005bbb",
  color: "white",
  padding: "10px 22px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};

const backBtn = {
  background: "#6c757d",
  color: "white",
  padding: "8px 18px",
  borderRadius: "6px",
  border: "none",
  marginBottom: "14px",
  cursor: "pointer"
};

export default UpdateDoctor;