// In Listing.jsx
import { useParams, Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './Listing.css';

interface Card {
  id: number;
  title: string;
  image: string;
  username: string;
  requestedCards: number[];
}

export const mockListings: Card[] = Array(20).fill(null).map((_, i) => ({
  id: i,
  title: `Heracross ${i}`,
  image: 'https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75',
  username: `Trainer${String.fromCharCode(65 + i)}`,
  requestedCards: Array(4).fill(null).map((_, j) => (i + j + 1) % 20),
}));

export default function Listing() {
  const { id } = useParams();
  const listing = mockListings.find(item => item.id === Number(id));

  if (!listing) {
    return (
      <Layout>
        <div className="error">Listing not found</div>
      </Layout>
    );
  }

  // Process requested cards and group by user
  const requestedCards: Card[] = listing.requestedCards
  .map(requestedId => mockListings.find(c => c.id === requestedId))
  .filter((c): c is Card => c !== undefined);

  const groupedByUser = requestedCards.reduce((groups: { [key: string]: Card[] }, card: Card) => {
    const username = card.username;
    groups[username] = groups[username] || [];
    groups[username].push(card);
    return groups;
  }, {} as { [key: string]: Card[] });

  return (
    <Layout>
      <div className="listing-container">
        {/* Left Column */}
        <div className="left-column">
          <h1>{listing.title}</h1>
          <div className="card-detail">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="detail-image"
            />
            <div className="detail-info">
              <p>Listing ID: {id}</p>
              <p>Card Description:</p>
            </div>
          </div>
        </div>

        {/* Right Column with grouped trades */}
        <div className="right-column">
          <div className="trade-section">
            <h2>Requested Trades</h2>
            <div className="user-trades-container">
              {Object.entries(groupedByUser).map(([username, cards]) => (
                <div className="user-trade-group" key={username}>
                  <div className="user-header">
                    <Link to={`/user/${username}`} className="username">{username}</Link>
                    <span className="user-rating">⭐ ratingID</span>
                  </div>
                  <div className="user-cards-grid">
                    {cards.map((card) => (
                      <Link 
                        to={`/listing/${card.id}`} 
                        className="trade-card"
                        key={card.id}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="trade-card-image"
                        />
                        <div className="trade-card-info">
                          <h3>{card.title}</h3>
                          <p>ID: {card.id}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}