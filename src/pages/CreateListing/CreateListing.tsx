import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import "./CreateListing.css";

interface Card {
  cardId: number;
  name: string;
  rarity: number;
  setName: string;
  cardImage: string;
}

export default function CreateListing() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffering, setSelectedOffering] = useState<Card | null>(null);
  const [selectedExpecting, setSelectedExpecting] = useState<Card[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cards");
        if (!response.ok) throw new Error("Failed to fetch cards");
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cards");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleCardSelect = (card: Card, isOffering: boolean) => {
    if (isOffering) {
      setSelectedOffering(card);
    } else {
      if (selectedExpecting.length >= 4) return;
      if (!selectedExpecting.some(c => c.cardId === card.cardId)) {
        setSelectedExpecting([...selectedExpecting, card]);
      }
    }
  };

  const removeExpectedCard = (cardId: number) => {
    setSelectedExpecting(selectedExpecting.filter(c => c.cardId !== cardId));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedOffering) {
      alert("Please select a card to offer");
      return;
    }

    try {  
      const response = await fetch("http://localhost:8080/api/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          offeredCardId: selectedOffering.cardId,
          requestedCard1Id: selectedExpecting[0]?.cardId ?? null,
          requestedCard2Id: selectedExpecting[1]?.cardId ?? null,
          requestedCard3Id: selectedExpecting[2]?.cardId ?? null,
          requestedCard4Id: selectedExpecting[3]?.cardId ?? null,
        }),
      });

      if (!response.ok) throw new Error("Failed to create listing with POST");
      navigate("/");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create listing");
    }
  };

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4">Create Trade Listing</h2>
        <form onSubmit={handleSubmit}>
          {/* Offering Section */}
          <div className="card mb-4">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Card You're Offering</h5>
              {selectedOffering ? (
                <div className="selected-card">
                  <img
                    src={selectedOffering.cardImage}
                    alt={selectedOffering.name}
                    className="img-thumbnail mb-2"
                    style={{
                      width: "183.5px",
                      height: "256px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setSelectedOffering(null)}
                    >
                      Change Card
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="search-container mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search cards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="card-grid-container">
                    <div className="row row-cols-2 row-cols-md-4 g-4">
                      {filteredCards.map((card) => (
                        <div key={card.cardId} className="col">
                          <div
                            className="card h-100 clickable"
                            onClick={() => handleCardSelect(card, true)}
                          >
                            <img
                              src={card.cardImage}
                              className="card-img-top"
                              alt={card.name}
                              style={{
                                width: "183.5px",
                                height: "256px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{card.name}</h6>
                              <small className="text-muted">{card.setName}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Expecting Section */}
          <div className="card mb-4">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Cards You're Expecting (max 4)</h5>
              <div className="selected-cards-container mb-3">
                {selectedExpecting.map((card) => (
                  <div key={card.cardId} className="selected-expecting-card">
                    <img
                      src={card.cardImage}
                      alt={card.name}
                      className="img-thumbnail"
                      style={{
                        width: "183.5px",
                        height: "256px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger remove-btn"
                      onClick={() => removeExpectedCard(card.cardId)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {selectedExpecting.length < 4 ? (
                <>
                  <div className="search-container mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search cards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="card-grid-container">
                    <div className="row row-cols-2 row-cols-md-4 g-4">
                      {filteredCards.map((card) => (
                        <div key={card.cardId} className="col">
                          <div
                            className="card h-100 clickable"
                            onClick={() => handleCardSelect(card, false)}
                          >
                            <img
                              src={card.cardImage}
                              className="card-img-top"
                              alt={card.name}
                              style={{
                                width: "183.5px",
                                height: "256px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{card.name}</h6>
                              <small className="text-muted">{card.setName}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="alert alert-info mt-3">
                  Maximum of 4 cards selected. Remove cards to make changes.
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Trade Listing
          </button>
        </form>
      </div>
    </Layout>
  );
}
