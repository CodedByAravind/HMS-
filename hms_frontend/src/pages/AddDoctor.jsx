import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddDoctor() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    department_id: "",
    specialization: "",
    experience: "",
    reg_id: "",
    phone: ""
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();

    api.post("doctors/create/", formData)
      .then(() => {
        alert("Doctor added");
        navigate("/admin");
      })
      .catch(err => console.log(err));
  };

  return (

    <div style={{ padding: "40px" }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}>
        <h2>Add Doctor</h2>
        <button onClick={() => navigate("/admin")}>Back</button>
      </div>

      <form onSubmit={submit} style={{
        maxWidth: "650px",
        margin: "auto",
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px"
        }}>

          <input
            placeholder="First Name"
            name="first_name"
            onChange={handleChange}
            required
          />

          <input
            placeholder="Last Name"
            name="last_name"
            onChange={handleChange}
          />

          <input
            placeholder="Specialization"
            name="specialization"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

          <input
            type="number"
            placeholder="Experience (years)"
            name="experience"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

          <input
            placeholder="Doctor Reg ID"
            name="reg_id"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

          <input
            placeholder="Phone Number"
            name="phone"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

          <select
            name="department_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>

            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}

          </select>

          <input
            placeholder="Username"
            name="username"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
            required
          />

        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>

          <button type="submit">
            Save
          </button>

          <button type="button" onClick={() => navigate("/admin")}>
            Cancel
          </button>

        </div>

      </form>

    </div>

  );
}

export default AddDoctor;