import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function DoctorList() {

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    api.get("doctors/")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));

  }, []);


  const blacklist = (id) => {

    api.post(`blacklist/${id}/`)
      .then(() => {
        alert("Doctor blacklisted");
        window.location.reload();
      })
      .catch(err => console.log(err));

  };


  const undoBlacklist = (id) => {

    api.post(`unblacklist/${id}/`)
      .then(() => {
        alert("Doctor restored");
        window.location.reload();
      })
      .catch(err => console.log(err));

  };


  const filteredDoctors = doctors.filter(d => {

    const matchDept = department ? d.department?.id == department : true;

    const name =
      (d.user.first_name + " " + d.user.last_name).toLowerCase();

    const matchSearch = name.includes(search.toLowerCase());

    return matchDept && matchSearch;

  });


  const activeDoctors = filteredDoctors.filter(d => !d.is_blacklisted);
  const blockedDoctors = filteredDoctors.filter(d => d.is_blacklisted);


  return (
    <div style={container}>

      {/* Header */}

      <div style={header}>

        <h2 style={title}>Registered Doctors</h2>

        <button
          style={backBtn}
          onClick={() => navigate("/admin")}
        >
          Back
        </button>

      </div>


      {/* Filters */}

      <div style={filterBox}>

        <select
          style={input}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>

          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}

        </select>


        <input
          style={input}
          placeholder="Search by Doctor Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* Active Doctors */}

      <div style={sectionHeader}>
        Active Doctors
      </div>

      <div style={listContainer}>

        {activeDoctors.length > 0 ? (

          activeDoctors.map(d => (

            <div key={d.id} style={row}>

              <span>

                Dr. {d.user.first_name} {d.user.last_name}

                {d.department &&
                  <span style={deptText}>
                    {" "} - {d.department.name}
                  </span>
                }

              </span>

              <div>

                <button
                  style={viewBtn}
                  onClick={() => navigate(`/doctor/${d.id}`)}
                >
                  View
                </button>

                <button
                  style={editBtn}
                  onClick={() => navigate(`/update-doctor/${d.id}`)}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                >
                  Delete
                </button>

                <button
                  style={blackBtn}
                  onClick={() => blacklist(d.user.id)}
                >
                  Blacklist
                </button>

              </div>

            </div>

          ))

        ) : (

          <p style={noData}>No active doctors found.</p>

        )}

      </div>


      {/* Blacklisted Doctors */}

      <div style={sectionHeaderRed}>
        Blacklisted Doctors
      </div>

      <div style={listContainer}>

        {blockedDoctors.length > 0 ? (

          blockedDoctors.map(d => (

            <div key={d.id} style={row}>

              <span style={{color:"#e63946"}}>

                Dr. {d.user.first_name} {d.user.last_name}

                {d.department &&
                  <span style={deptText}>
                    {" "} - {d.department.name}
                  </span>
                }

              </span>

              <button
                style={undoBtn}
                onClick={() => undoBlacklist(d.user.id)}
              >
                Undo
              </button>

            </div>

          ))

        ) : (

          <p style={noData}>No blacklisted doctors found.</p>

        )}

      </div>

    </div>
  );
}


const container = {
  width: "88%",
  margin: "auto"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px"
};

const title = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#003366"
};

const backBtn = {
  background: "gray",
  color: "#fff",
  padding: "7px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

const filterBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "20px"
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const sectionHeader = {
  background: "#0d6efd",
  color: "white",
  padding: "10px 14px",
  borderRadius: "6px 6px 0 0",
  fontWeight: "600"
};

const sectionHeaderRed = {
  background: "#d63333",
  color: "white",
  padding: "10px 14px",
  borderRadius: "6px 6px 0 0",
  fontWeight: "600",
  marginTop: "20px"
};

const listContainer = {
  border: "1px solid #dcdcdc",
  borderRadius: "0 0 6px 6px",
  padding: "14px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 6px",
  borderBottom: "1px solid #eee"
};

const deptText = {
  color: "#0d6efd",
  fontWeight: "500"
};

const viewBtn = {
  background: "#0276ff",
  color: "#fff",
  marginRight: "6px",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none"
};

const editBtn = {
  background: "#ffc107",
  color: "#000",
  marginRight: "6px",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none"
};

const deleteBtn = {
  background: "#e63946",
  color: "#fff",
  marginRight: "6px",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none"
};

const blackBtn = {
  background: "#000",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none"
};

const undoBtn = {
  background: "#198754",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none"
};

const noData = {
  textAlign: "center",
  color: "#666"
};

export default DoctorList;