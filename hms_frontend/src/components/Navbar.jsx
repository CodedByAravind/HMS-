import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "#1976d2",
        color: "white"
      }}
    >

      <h3>Hospital Management System</h3>

      <div>

        {role === "admin" && (
          <>
            <button onClick={() => navigate("/admin")}>Dashboard</button>
            <button onClick={() => navigate("/doctors")}>Doctors</button>
            <button onClick={() => navigate("/patients")}>Patients</button>
            <button onClick={() => navigate("/appointments")}>Appointments</button>
          </>
        )}

        {role === "doctor" && (
          <>
            <button onClick={() => navigate("/doctor")}>Dashboard</button>
            <button onClick={() => navigate("/availability")}>Availability</button>
          </>
        )}

        {role === "patient" && (
          <>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/departments")}>Departments</button>
          </>
        )}

        <button onClick={logout} style={{ marginLeft: "15px" }}>
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;