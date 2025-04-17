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

interface Listing {
  tradeId: number;
  offeredCard: Card;
  requestedCard1: Card;
  requestedCard2: Card;
  requestedCard3: Card;
  requestedCard4: Card;
}

interface Card {
  cardId: number;
  name: string;
  rarity: number;
  setName: string;
  cardImage: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trades");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (err: any) {
        console.error("Error fetching listings:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <Layout>
      <div className="home-container">
        <section className="listings-section">
          <h2>Trending Listings</h2>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
            </div>
          ) : listings.length === 0 ? (
            <p>No trade listings</p>
          ) : (
            <HorizontalScroll>
              {listings.map((listing) => (
                <div key={listing.tradeId} className="card-wrapper">
                  <Link to={`/listing/${listing.offeredCard.cardId}`}>
                    <img 
                      src={listing.offeredCard.cardImage} 
                      alt={listing.offeredCard.name}
                      className="card-image"
                      style={{
                        width: "367px",
                        height: "512px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-details">
                      <h3>{listing.offeredCard.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          )}
        </section>
      </div>
    </Layout>
  );
}