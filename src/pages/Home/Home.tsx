import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './Home.css';

const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollAmount = 400;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="scroll-wrapper">
      <button 
        className="scroll-arrow left" 
        onClick={() => handleScroll('left')}
      >
        &lt;
      </button>
      
      <div className="cards-scroll-container" ref={scrollRef}>
        {children}
      </div>

      <button 
        className="scroll-arrow right" 
        onClick={() => handleScroll('right')}
      >
        &gt;
      </button>
    </div>
  );
};

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
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trades");
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
    const seenCards = new Set<number>();
    const uniqueCards: Card[] = [];
    
    listings.forEach(listing => {
      if (!seenCards.has(listing.offeredCard.cardId)) {
        seenCards.add(listing.offeredCard.cardId);
        uniqueCards.push(listing.offeredCard);
      }
    });
    
    return uniqueCards;
  };

  const uniqueCards = getUniqueCards();

  return (
    <Layout>
      <div className="home-container">
        <section className="listings-section">
          <h2>Trending Listings</h2>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : uniqueCards.length === 0 ? (
            <p>No trade listings available</p>
          ) : (
            <div className="cards-grid">
  {uniqueCards.map((card) => (
    <div key={card.cardId} className="card-wrapper">
      <Link to={`/listing/${card.cardId}`}>
        <img 
          src={card.cardImage} 
          alt={card.name}
          className="card-image"
        />
        <div className="card-details">
          <h3>{card.name}</h3>
          <p className="set-name">{card.setName}</p>
          <p className="rarity">Rarity: {card.rarity}</p>
        </div>
      </Link>
    </div>
  ))}
</div>
          )}
        </section>
      </div>
    </Layout>
  );
}