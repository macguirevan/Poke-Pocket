import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../../layout/Layout";

interface Card {
  cardId: number;
  name: string;
  cardImage: string;
  rarity: number;
  setName: string;
}

interface Trade {
  tradeId: number;
  offeredCard: Card;
  requestedCard1: Card | null;
  requestedCard2: Card | null;
  requestedCard3: Card | null;
  requestedCard4: Card | null;
}

interface User {
  userId: number;
  friendId: string;
  username: string;
  password: string;
  email: string;
  rating: string | null;
  trades: Trade[];
}

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        // Direct fetch for the specific user by userId
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json() as User;
        setUser(userData);
      }
      catch (error) {
        console.error("Error fetching user:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
      finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  if (loading) return <Layout><div>Loading user profile...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;
  if (!user) return <Layout><div>User not found</div></Layout>;

  return (
    <Layout>
      <div style={styles.container}>
        {/* Profile Header */}
        <section style={styles.profileSection}>
          <div style={styles.infoContainer}>
            <h1 style={styles.name}>{user.username}</h1>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Friend Code:</span>
              <span style={styles.friendCode}>{user.friendId}</span>
            </div>
          </div>
        </section>

        {/* Published Listings */}
        <section style={styles.listingsSection}>
          <h2 style={styles.sectionTitle}>Active Trade Listings</h2>
          <div style={styles.listingsGrid}>
            {user.trades && user.trades.length > 0 ? (
              user.trades.map(trade => (
                <Link 
                  to={`/listing/${trade.offeredCard.cardId}`}
                  key={trade.tradeId}
                  style={styles.listingCard}
                >
                  <div style={styles.listingInfo}>
                    <h3 style={styles.listingTitle}>{trade.offeredCard.name}</h3>
                    <p style={styles.listingSet}>{trade.offeredCard.setName}</p>
                  </div>
                  
                  <img
                    src={trade.offeredCard.cardImage}
                    alt={trade.offeredCard.name}
                    style={styles.listingImage}
                  />
                  
                  <div style={styles.requestedCardsCount}>
                    {[trade.requestedCard1, trade.requestedCard2, trade.requestedCard3, trade.requestedCard4]
                      .filter(card => card !== null).length} cards requested
                  </div>
                </Link>
              ))
            ) : (
              <p style={styles.noListings}>No active trade listings</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  profileSection: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginBottom: '2rem',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover' as 'cover'
  },
  userMeta: {
    display: 'flex',
    gap: '2rem',
    margin: '1rem 0'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  metaLabel: {
    fontWeight: '600',
    color: '#666'
  },
  rating: {
    color: '#ff9800',
    fontWeight: 'bold'
  },
  friendCode: {
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px'
  },
  listingsSection: {
    marginTop: '2rem',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    marginBottom: '1.5rem',
    color: '#333'
  },
  listingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  listingCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100%',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  listingImage: {
    width: '100%',
    height: '180px',
    objectFit: 'contain' as 'contain',
    padding: '1rem',
    backgroundColor: '#fff',
    flex: '1 1 auto'
  },
  listingInfo: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff'
  },
  listingTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    color: '#333'
  },
  listingSet: {
    color: '#666',
    fontSize: '0.9rem',
    margin: 0
  },
  requestedCardsCount: {
    padding: '0.75rem',
    backgroundColor: '#f0f0f0',
    borderTop: '1px solid #eee',
    fontSize: '0.9rem',
    color: '#555',
    textAlign: 'center' as 'center'
  },
  noListings: {
    color: '#666',
    textAlign: 'center' as 'center',
    padding: '2rem',
    gridColumn: '1 / -1'
  }, 
  name: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
  },
  infoContainer: {
    flex: '1',
  }
};