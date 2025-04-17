import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './Home.css';

interface Card {
  cardId: number;
  name: string;
  rarity: number;
  setName: string;
  cardImage: string;
}

interface Listing {
  tradeId: number;
  offeredCard: Card;
  requestedCard1: Card | null;
  requestedCard2: Card | null;
  requestedCard3: Card | null;
  requestedCard4: Card | null;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://34.201.94.196:8080/api/trades");
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch listings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Get unique cards (no duplicates)
  const getUniqueCards = () => {
    const seenCards = new Set();
    const uniqueCards: Card[] = [];
   
    listings.forEach(listing => {
      if (!seenCards.has(listing.offeredCard.cardId)) {
        seenCards.add(listing.offeredCard.cardId);
        uniqueCards.push(listing.offeredCard);
      }
    });
   
    return uniqueCards;
  };

  const getRarityLabel = (rarity: number): string => {
    switch (rarity) {
      case 1:
        return "Common";
      case 2:
        return "Uncommon";
      case 3:
        return "Rare";
      case 4:
        return "Double Rare";
      case 5:
        return "Illustration Rare";
      case 6:
        return "Special Art Rare";
      case 7:
        return "Immersive Rare";
      case 8:
        return "Crown Rare";
      default:
        return "Crown Rare";
    }
  };

  const uniqueCards = getUniqueCards();

  return (
    <Layout>
      <div className="home-container">
        <section className="listings-section">
          <h2>Trending Listings</h2>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : uniqueCards.length === 0 ? (
            <div className="error-message">No trade listings available</div>
          ) : (
            <div className="cards-grid">
              {uniqueCards.map((card) => (
                <Link to={`/listing/${card.cardId}`} key={card.cardId} className="card-wrapper">
                  <img 
                    src={card.cardImage} 
                    alt={card.name} 
                    className="card-image" 
                  />
                  <div className="card-details">
                    <div className="card-name-details">
                      <h3 className="card-name">{card.name}</h3>
                    </div>
                    <p className="set-name">{card.setName}</p>
                    <p className="rarity">Rarity: {getRarityLabel(card.rarity)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}