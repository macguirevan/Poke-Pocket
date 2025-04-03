import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "../../layout/Layout"

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [friendID, setFriendID] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Signing up with:", { username, password, email, friendID });
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
                value={friendID}
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
              {friendID.length > 0 && friendID.length < 16 && (
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