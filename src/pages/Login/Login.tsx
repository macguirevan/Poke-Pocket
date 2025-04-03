import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "../../layout/Layout"


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Sending POST request to Spring Boot backend
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text(); // Get the response text
      
      if (data === "Login successful") {
        console.log("Login successful");
        // Redirect user or store JWT token in localStorage/sessionStorage
      } else {
        setErrorMessage(data);  // Show error message if login fails
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center mb-4">
          <h1 className="my-3">Poké Pocket</h1>
          <p>"A central hub for Pokémon TCG Pocket players to connect easily"</p>
        </div>
        <div className="bg-white p-5 rounded shadow-lg w-50">
          <h2 className="text-center mb-4">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="mt-3 text-center">Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </div>
    </Layout>
  );
}