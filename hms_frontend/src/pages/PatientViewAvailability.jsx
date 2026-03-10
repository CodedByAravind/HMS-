import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function DoctorAvailability() {

  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api.get(`availability/${id}/`)
      .then(res => setSlots(res.data))
      .catch(err => console.log(err));

  }, [id]);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Doctor Availability</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {slots.map(slot => (
            <tr key={slot.id}>

              <td>{slot.date}</td>
              <td>{slot.time}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/book/${id}?date=${slot.date}&time=${slot.time}`)
                  }
                >
                  Book
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DoctorAvailability;