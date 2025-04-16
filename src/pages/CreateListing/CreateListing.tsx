import "bootstrap/dist/css/bootstrap.min.css";
import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();

  const [offering, setOffering] = useState<string>("");
  const [expecting, setExpecting] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Offering:", offering);
    console.log("Expecting:", expecting);

    // You can replace this with an API call or other logic
    alert("Listing created!");
    navigate("/");
  };

  const handleOfferingChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOffering(e.target.value);
  };

  const handleExpectingChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpecting(e.target.value);
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4">Create a Trade Listing</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
          <div className="mb-3">
            <label htmlFor="offering" className="form-label">
              Cards You Are Offering
            </label>
            <textarea
              className="form-control"
              id="offering"
              rows={3}
              placeholder="e.g., Pikachu, Charizard, Bulbasaur"
              value={offering}
              onChange={handleOfferingChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expecting" className="form-label">
              Cards You Are Expecting
            </label>
            <textarea
              className="form-control"
              id="expecting"
              rows={3}
              placeholder="e.g., Blastoise, Gengar"
              value={expecting}
              onChange={handleExpectingChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Listing
          </button>
        </form>
      </div>
    </Layout>
  );
}