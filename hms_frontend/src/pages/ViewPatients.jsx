import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ViewPatients() {

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    api.get("patients/")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));

  }, []);


  const deletePatient = (id) => {

    api.delete(`patients/${id}/`)
      .then(() => {
        setPatients(patients.filter(p => p.id !== id));
      })
      .catch(err => console.log(err));

  };


  const blacklist = (userId) => {

    api.post(`blacklist/${userId}/`)
      .then(() => {
        setPatients(patients.map(p =>
          p.user.id === userId ? { ...p, is_blacklisted: true } : p
        ));
      });

  };


  const unblacklist = (userId) => {

    api.post(`unblacklist/${userId}/`)
      .then(() => {
        setPatients(patients.map(p =>
          p.user.id === userId ? { ...p, is_blacklisted: false } : p
        ));
      });

  };


  const filteredPatients = patients.filter(p => {

    const name =
      `${p.user.first_name} ${p.user.last_name}`.toLowerCase();

    const phone = p.phone?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      phone.includes(search.toLowerCase())
    );

  });

  const active = filteredPatients.filter(p => !p.is_blacklisted);
  const blocked = filteredPatients.filter(p => p.is_blacklisted);


  return (

    <div>

      <Navbar role="admin"/>

      <div style={container}>

        <div style={header}>

          <h2>Registered Patients</h2>

          <button
            style={backBtn}
            onClick={() => navigate("/admin")}
          >
            Back
          </button>

        </div>


        {/* Search */}

        <div style={filterBox}>

          <input
            style={filterInput}
            placeholder="Search by Name / Phone..."
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>


        {/* Active Patients */}

        <div style={card}>

          <div style={greenHeader}>
            Active Patients
          </div>

          <div style={cardBody}>

            {active.length > 0 ? (

              active.map(p => (

                <div key={p.id} style={row}>

                  <strong>
                    {p.user.first_name} {p.user.last_name}
                  </strong>

                  <div>

                    <button
                      style={btnView}
                      onClick={() => navigate(`/history/${p.id}`)}
                    >
                      View
                    </button>

                    <button
                      style={btnEdit}
                      onClick={() => navigate(`/update-patient/${p.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      style={btnDelete}
                      onClick={() => deletePatient(p.id)}
                    >
                      Delete
                    </button>

                    <button
                      style={btnBlacklist}
                      onClick={() => blacklist(p.user.id)}
                    >
                      Blacklist
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <p style={noData}>
                No active patients found.
              </p>

            )}

          </div>

        </div>


        {/* Blacklisted Patients */}

        <div style={card}>

          <div style={redHeader}>
            Blacklisted Patients
          </div>

          <div style={cardBody}>

            {blocked.length > 0 ? (

              blocked.map(p => (

                <div key={p.id} style={blockedRow}>

                  <strong style={{color:"#b30000"}}>
                    {p.user.first_name} {p.user.last_name}
                  </strong>

                  <button
                    style={btnUndo}
                    onClick={() => unblacklist(p.user.id)}
                  >
                    Undo
                  </button>

                </div>

              ))

            ) : (

              <p style={noData}>
                No blacklisted patients.
              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}


/* Styles */

const container = {
  width: "88%",
  maxWidth: "1100px",
  margin: "30px auto"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "22px"
};

const backBtn = {
  background: "#6c757d",
  color: "white",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none"
};

const filterBox = {
  marginBottom: "18px"
};

const filterInput = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const card = {
  background: "white",
  borderRadius: "10px",
  marginBottom: "24px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const greenHeader = {
  background: "#198754",
  color: "white",
  padding: "12px 16px",
  fontWeight: "bold",
  borderRadius: "10px 10px 0 0"
};

const redHeader = {
  background: "#dc3545",
  color: "white",
  padding: "12px 16px",
  fontWeight: "bold",
  borderRadius: "10px 10px 0 0"
};

const cardBody = {
  padding: "14px 18px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "12px",
  marginBottom: "10px"
};

const blockedRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "12px",
  marginBottom: "10px",
  background: "#f8d7da"
};

const btnView = {
  background: "#0d6efd",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  border: "none",
  marginLeft: "6px"
};

const btnEdit = {
  background: "#ffc107",
  color: "#000",
  padding: "4px 10px",
  borderRadius: "6px",
  border: "none",
  marginLeft: "6px"
};

const btnDelete = {
  background: "#dc3545",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  border: "none",
  marginLeft: "6px"
};

const btnBlacklist = {
  background: "#000",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  border: "none",
  marginLeft: "6px"
};

const btnUndo = {
  background: "#198754",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  border: "none"
};

const noData = {
  textAlign: "center",
  padding: "14px",
  color: "#555"
};

export default ViewPatients;