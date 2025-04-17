import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "../../layout/Layout"
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [friendId, setFriendID] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log(friendId);
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    if (friendId.length !== 16) {
      setErrorMessage("Friend ID must be exactly 16 digits");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          friendId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        throw errorJson;
      }
  
      // Make API request to fetch the userId based on the username that was posted
      try {
        const response = await fetch(`http://localhost:8080/api/users/username/${username}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
      
        if (!response.ok) {
          throw new Error("Failed to fetch user by username");
        }
      
        const userData = await response.json();
      
        localStorage.setItem("userId", userData.userId);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setFriendID("");
        setErrorMessage("");
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } catch (error: any) {
        console.error("Error fetching user:", error);
      }
    } catch (error : any) {
      console.error("Error:", error);
      setErrorMessage(error.detail || "An error occurred. Please try again.");
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
          <h2 className="text-center mb-4">Create Your Account</h2>
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
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              {password !== confirmPassword && (
                <small className="text-danger">Passwords do not match</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Friend ID</label>
              <input 
                type="text" 
                className="form-control text-center" 
                value={friendId}
                onChange={(e) => {
                  // Only Numbers & Must be 16 digits long
                  const numericValue = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setFriendID(numericValue);
                }}
                inputMode="numeric"
                pattern="\d{16}"
                placeholder="Ex: XXXX-XXXX-XXXX-XXXX"
                required 
              />
              {friendId.length > 0 && friendId.length < 16 && (
                <small className="text-danger">Friend ID must be exactly 16 digits</small>
              )}
              <div className="signup-sublabel">Please enter numbers only without any hyphens.</div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
          </form>
          <p className="mt-3 text-center">Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </Layout>
  );
}