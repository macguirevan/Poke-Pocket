import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Layout from "../../layout/Layout"

export default function User() {
  const { userId } = useParams();
  
  const [user, setUser] = useState<{
    userId: number;
    friendId: string;
    username: string;
    password: string;
    email: string;
    rating: string | null;
  } | null>(null);
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const users = await response.json() as {
          userId: number;
          friendId: string;
          username: string;
          password: string;
          email: string;
          rating: string | null;
        }[];
        
        const matchedUser = users.find(user => user.userId === Number(userId));
        
        if (matchedUser) {
          setUser(matchedUser);
          console.log(matchedUser.userId);
          console.log(matchedUser.email);
          console.log(matchedUser.friendId);
        }
      }
      catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  // User data with dummy listings
  const userData = {
    username: user?.username,
    friendCode: user?.friendId,
    rating: user?.rating,
    listings: [
      {
        id: 1,
        title: "Heracross 1",
        image: "https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75"
      },
      {
        id: 2,
        title: "Heracross 2",
        image: "https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75"
      },
      {
        id: 3,
        title: "Heracross 3",
        image: "https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75"
      }
    ]
  }

  return (
    <Layout>
      <div style={styles.container}>
        {/* Profile Header */}
        <section style={styles.profileSection}>
          <div style={styles.infoContainer}>
            <h1 style={styles.name}>{userData.username}</h1>
            <div style={styles.userMeta}>
              <div style={styles.metaItem}>
                <span style={styles.rating}>⭐ {userData.rating}</span>
              </div>
            </div>
            <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Friend Code:</span>
                <span style={styles.friendCode}>{userData.friendCode}</span>
              </div>
          </div>
        </section>

        {/* Published Listings */}
        <section style={styles.listingsSection}>
          <h2 style={styles.sectionTitle}>Published Listings</h2>
          <div style={styles.listingsGrid}>
            {userData.listings.length > 0 ? (
              userData.listings.map(listing => (
                <Link 
                  to={`/listing/${listing.id}`}
                  key={listing.id}
                  style={styles.listingCard}
                >
                  <h3 style={styles.listingTitle}>{listing.title}</h3>
                  
                  <img
                    src={listing.image}
                    alt={listing.title}
                    style={styles.listingImage}
                  />
                </Link>
              ))
            ) : (
              <p style={styles.noListings}>No published listings yet</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
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
    objectFit: 'cover'
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
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  listingImage: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    padding: '1rem',
    backgroundColor: '#f8f8f8'
  },
  listingInfo: {
    padding: '1rem'
  },
  listingTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1rem'
  },
  listingId: {
    color: '#666',
    fontSize: '0.9rem',
    margin: 0
  },
  noListings: {
    color: '#666',
    textAlign: 'center',
    padding: '2rem'
  }
}