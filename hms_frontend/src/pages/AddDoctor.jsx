import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddDoctor() {

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

  const submit = () => {

    api.post("doctors/", {
      name: name,
      department: department
    })
    .then(() => {
      alert("Doctor added");
      navigate("/admin");
    })
    .catch(err => console.log(err));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Add Doctor</h2>

      <input
        placeholder="Doctor Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Department"
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Create
      </button>

    </div>

  );
}

export default AddDoctor;