import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import BookAppointment from "./pages/BookAppointment";
// import DoctorProfile from "./pages/DoctorProfile";
// import DoctorAvailability from "./pages/DoctorAvailability";
// import PatientHistory from "./pages/PatientHistory";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* <Route path="/doctor" element={
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/book" element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        } />

        <Route path="/doctor/:id" element={
          <ProtectedRoute>
            <DoctorProfile />
          </ProtectedRoute>
        } />

        <Route path="/availability/:id" element={
          <ProtectedRoute>
            <DoctorAvailability />
          </ProtectedRoute>
        } />

        <Route path="/history/:id" element={
          <ProtectedRoute>
            <PatientHistory />
          </ProtectedRoute>
        } /> */}

      </Routes>

    </BrowserRouter>
  );
}

export default App;