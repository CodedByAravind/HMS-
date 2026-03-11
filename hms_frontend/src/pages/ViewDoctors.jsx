import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ViewDoctors() {

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    api.get("doctors/")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));

  }, []);

  const deleteDoctor = (id) => {

    api.delete(`doctors/${id}/`)
      .then(() => {
        setDoctors(doctors.filter(d => d.id !== id));
      })
      .catch(err => console.log(err));

  };

  const blacklist = (userId) => {

    api.post(`blacklist/${userId}/`)
      .then(() => {
        setDoctors(doctors.map(d =>
          d.user.id === userId ? { ...d, is_blacklisted: true } : d
        ));
      })
      .catch(err => console.log(err));

  };

  const unblacklist = (userId) => {

    api.post(`unblacklist/${userId}/`)
      .then(() => {
        setDoctors(doctors.map(d =>
          d.user.id === userId ? { ...d, is_blacklisted: false } : d
        ));
      })
      .catch(err => console.log(err));

  };

  const filteredDoctors = doctors.filter(d => {

    const name =
      `${d.user.first_name} ${d.user.last_name}`.toLowerCase();

    return (
      name.includes(search.toLowerCase()) &&
      (department === "" || d.department?.id === Number(department))
    );

  });

  const active = filteredDoctors.filter(d => !d.is_blacklisted);
  const blocked = filteredDoctors.filter(d => d.is_blacklisted);

  return (

    <div>

      <Navbar role="admin"/>

      <div style={container}>

        <div style={header}>
          <h3 style={title}>Registered Doctors</h3>

          <button style={backBtn} onClick={() => navigate("/admin")}>
            Back
          </button>
        </div>


        {/* Filters */}

        <div style={filterBox}>

          <select
            style={filterInput}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>

            {departments.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}

          </select>

          <input
            style={filterInput}
            placeholder="Search by Doctor Name..."
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* Active Doctors */}

        <div style={sectionHeader}>
          Active Doctors
        </div>

        <div style={listContainer}>

          {active.length > 0 ? (

            active.map(doc => (

              <div key={doc.id} style={row}>

                <span>

                  Dr. {doc.user.first_name} {doc.user.last_name}

                  {doc.department && (
                    <span style={deptText}>
                      {" "} - {doc.department.name}
                    </span>
                  )}

                </span>

                <div>

                  <button
                    style={btnView}
                    onClick={() => navigate(`/doctor/${doc.id}`)}
                  >
                    View
                  </button>

                  <button
                    style={btnEdit}
                    onClick={() => navigate(`/update-doctor/${doc.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    style={btnDelete}
                    onClick={() => deleteDoctor(doc.id)}
                  >
                    Delete
                  </button>

                  <button
                    style={btnBlacklist}
                    onClick={() => blacklist(doc.user.id)}
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

          {blocked.length > 0 ? (

            blocked.map(doc => (

              <div key={doc.id} style={row}>

                <span style={{ color: "#d63333" }}>
                  Dr. {doc.user.first_name} {doc.user.last_name}
                </span>

                <button
                  style={btnUndo}
                  onClick={() => unblacklist(doc.user.id)}
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

    </div>
  );
}


/* Styles */

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

const filterInput = {
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

const btnView = {
  background: "#0276ff",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none",
  marginRight: "5px"
};

const btnEdit = {
  background: "#ffc107",
  color: "#000",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none",
  marginRight: "5px"
};

const btnDelete = {
  background: "#e63946",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none",
  marginRight: "5px"
};

const btnBlacklist = {
  background: "#000",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none"
};

const btnUndo = {
  background: "#198754",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none"
};

const noData = {
  textAlign: "center",
  color: "#666",
  padding: "10px"
};

export default ViewDoctors;