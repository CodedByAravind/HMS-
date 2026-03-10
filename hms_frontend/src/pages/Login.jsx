import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      "http://127.0.0.1:8000/api/token/",
      {
        username: username,
        password: password
      }
    );

    // clear old login
    localStorage.clear();

    // save tokens
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // get user role
    const roleRes = await axios.get(
      "http://127.0.0.1:8000/api/user-role/",
      {
        headers: {
          Authorization: `Bearer ${res.data.access}`
        }
      }
    );

    const role = roleRes.data.role;

    localStorage.setItem("role", role);

    // redirect based on role
    if (role === "admin") {
      navigate("/admin");
    }
    else if (role === "doctor") {
      navigate("/doctor");
    }
    else {
      navigate("/dashboard");
    }

  } catch(err) {

    alert("Invalid username or password");

  }

};

  return (

    <div className="login-box">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

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

        <button type="submit" className="login-button">
          Login
        </button>

      </form>

      <div className="link">
        Do not have an account?
        <Link to="/register">Register</Link>
      </div>

    </div>

  );
}

export default Login;