import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import './Listing.css';

interface Card {
  cardId: number;
  name: string;
  cardImage: string;
  rarity: number;
  setName: string;
}

interface Trade {
  tradeId: number;
  username: string;
  offeredCard: Card;
  requestedCard1: Card | null;
  requestedCard2: Card | null;
  requestedCard3: Card | null;
  requestedCard4: Card | null;
}

interface User {
  userId: number;
  username: string;
}

export default function Listing() {
  const { id } = useParams();
  const [card, setCard] = useState<Card | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [userMap, setUserMap] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch card details
        const cardResponse = await fetch(`http://54.91.5.191:8080/api/cards/${id}`);
        if (!cardResponse.ok) throw new Error('Card not found');
        const cardData = await cardResponse.json();
        setCard(cardData);

        // Fetch all trades
        const tradesResponse = await fetch('http://54.91.5.191:8080/api/trades');
        if (!tradesResponse.ok) throw new Error('Failed to fetch trades');
        const allTrades: Trade[] = await tradesResponse.json();

        // Filter trades for this specific card
        const relevantTrades = allTrades.filter(trade => 
          trade.offeredCard.cardId === Number(id)
        );
        setTrades(relevantTrades);
        
        // Create a set of unique usernames from trades
        const uniqueUsernames = new Set(relevantTrades.map(trade => trade.username));
        
        // Create a map to store username -> userId
        const usernameToIdMap = new Map<string, number>();
        
        // Fetch user IDs for each username
        await Promise.all(
          Array.from(uniqueUsernames).map(async (username) => {
            try {
              const userResponse = await fetch(`http://54.91.5.191:8080/api/users/username/${username}`);
              if (userResponse.ok) {
                const userData: User = await userResponse.json();
                usernameToIdMap.set(username, userData.userId);
              }
            } catch (err) {
              console.error(`Failed to fetch user ID for ${username}:`, err);
            }
          })
        );
        
        setUserMap(usernameToIdMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;
  if (!card) return <Layout><div>Card not found</div></Layout>;

  // Helper function to get valid requested cards from a trade
  const getRequestedCards = (trade: Trade) => {
    return [
      trade.requestedCard1,
      trade.requestedCard2,
      trade.requestedCard3,
      trade.requestedCard4
    ].filter(card => card !== null) as Card[];
  };

  return (
    <Layout>
      <div className="listing-container">
        {/* Left Column - Offered Card Details */}
        <div className="left-column">
          <h1>{card.name}</h1>
          <div className="card-detail">
            <img 
              src={card.cardImage} 
              alt={card.name}
              className="detail-image"
            />
            <div className="detail-info">
              <p>Set: {card.setName}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Trade Listings */}
        <div className="right-column">
          <div className="trade-section">
            <h2>Active Trade Listings</h2>
            <div className="trades-container">
              {trades.map(trade => {
                const requestedCards = getRequestedCards(trade);
                const $username = trade.username;
                const userId = userMap.get($username);
                
                return (
                  <div key={trade.tradeId} className="trade-listing">
                    <div className="trade-header">
                      <h3 className="usernameOfLister">
                        {userId ? (
                          <Link to={`/user/${userId}`}>
                            {$username}
                          </Link>
                        ) : (
                          <Link to={`/user/username/${$username}`}>
                            {$username}
                          </Link>
                        )}
                      </h3>
                      <h4>Asking For:</h4>
                      <span className="badge bg-secondary">
                        {requestedCards.length} cards requested
                      </span>
                    </div>
                    
                    <div className="requested-cards-grid">
                      {requestedCards.map(requestedCard => (
                        <Link 
                          key={requestedCard.cardId} 
                          to={`/listing/${requestedCard.cardId}`}
                          className="trade-card"
                        >
                          <img
                            src={requestedCard.cardImage}
                            alt={requestedCard.name}
                            className="trade-card-image"
                          />
                          <div className="trade-card-info">
                            <h4>{requestedCard.name}</h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}