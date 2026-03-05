import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register(){

  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try{

      await api.post("patients/create/",{
        email,
        username,
        password,
        first_name:"New",
        last_name:"User",
        phone:"0000000000",
        address:"Unknown"
      });

      alert("Account created");

      navigate("/");

    }catch(err){

      console.log(err);
      alert("Registration failed");

    }

  };

  return(

    <div className="register-box">

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button className="register-button">
          Create an account
        </button>

      </form>

      <div className="link">
        Already have an account?
        <Link to="/">Login</Link>
      </div>

    </div>

  );

}

export default Register;