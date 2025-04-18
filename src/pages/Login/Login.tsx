import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "../../layout/Layout"
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Sending POST request to Spring Boot backend
      const response = await fetch("http://54.91.5.191:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        throw errorJson;
      }
      
      console.log("Login successful");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      setSuccessMessage("Login Successful! Redirecting...");
      
      // Make API call to get Unique Generated User ID
      try {
        const response = await fetch("http://54.91.5.191:8080/api/users", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
    
        const users = await response.json() as { userId: number, friendId: string, username: string, password: string, email: string }[];; // Assuming backend returns JSON
        const matchedUser = users.find(user => user.username === username);

        if (matchedUser) {
          localStorage.setItem("userId", matchedUser.userId.toString());
          localStorage.setItem("username", matchedUser.username.toString());
          console.log("Stored User ID in LocalStorage:", matchedUser.userId);
        } else {
          console.error("User not found");
        }
    
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
      
      setTimeout(() => navigate("/"), 500);
    } catch (error : any) {
      setErrorMessage(error.message);
      setUsername("");
      setPassword("");
      setSuccessMessage("");
      console.error(error.message);
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
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
          )}
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