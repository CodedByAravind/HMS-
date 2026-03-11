import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BookAppointment() {

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    api.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);


  const loadDoctors = (deptId) => {

    setDepartment(deptId);

    api.get(`doctors/?department=${deptId}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));

  };


  const loadSlots = (doctorId, selectedDate) => {

    setDoctor(doctorId);
    setDate(selectedDate);

    api.get(`availability/${doctorId}?date=${selectedDate}`)
      .then(res => setSlots(res.data))
      .catch(err => console.log(err));

  };


  const bookAppointment = (e) => {

    e.preventDefault();

    const patientId = localStorage.getItem("patient_id");

    api.post("appointments/create/", {
      doctor_id: doctor,
      patient_id: patientId,
      date: date,
      time: time
    })
    .then(() => {
      alert("Appointment booked successfully");
      navigate("/dashboard");
    })
    .catch(err => console.log(err));

  };


  return (

    <div style={containerStyle}>

      <button style={backBtn} onClick={() => navigate("/dashboard")}>
        Back
      </button>

      <h2 style={{ textAlign:"center", color:"#005bbb" }}>
        Book Appointment
      </h2>

      <form onSubmit={bookAppointment}>

        {/* Department */}

        <label>Select Department</label>

        <select
          value={department}
          onChange={(e) => loadDoctors(e.target.value)}
          required
        >
          <option value="">-- Choose Department --</option>

          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}

        </select>


        {/* Doctors */}

        {doctors.length > 0 && (

          <>
            <label>Select Doctor</label>

            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >

              <option value="">-- Choose Doctor --</option>

              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  Dr. {doc.user.first_name}
                </option>
              ))}

            </select>
          </>
        )}


        {/* Date */}

        {doctor && (

          <>
            <label>Select Date</label>

            <input
              type="date"
              onChange={(e) => loadSlots(doctor, e.target.value)}
              required
            />
          </>
        )}


        {/* Slots */}

        {slots.length > 0 && (

          <>
            <label>Available Time Slots</label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >

              {slots.map((slot,index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}

            </select>

            <div style={{ textAlign:"center", marginTop:"20px" }}>
              <button style={submitBtn}>
                Book Appointment
              </button>
            </div>

          </>
        )}

      </form>

    </div>

  );
}

const containerStyle = {
  maxWidth:"800px",
  margin:"20px auto",
  background:"#fff",
  padding:"22px",
  borderRadius:"10px",
  boxShadow:"0 0 10px rgba(0,0,0,0.12)"
}

const backBtn = {
  background:"#6c757d",
  color:"#fff",
  padding:"6px 14px",
  borderRadius:"6px",
  fontWeight:"600",
  marginBottom:"12px",
  border:"none",
  cursor:"pointer"
}

const submitBtn = {
  background:"#0276ff",
  color:"#fff",
  padding:"10px 20px",
  fontWeight:"bold",
  borderRadius:"6px",
  border:"none",
  cursor:"pointer"
}

export default BookAppointment;