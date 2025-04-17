import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../../layout/Layout";
import trashIcon from '../../assets/TrashCanIcon.png';
import clipboardIcon from '../../assets/Clipboard.png';
import './User.css';  // Import the CSS file

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
  const loggedInUserId = localStorage.getItem("userId");
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

  function copyToClipboard(friendCode: string) {
    navigator.clipboard.writeText(friendCode)
      .then(() => alert("Friend Code copied to clipboard!"))
      .catch((error) => alert("Failed to copy: " + error));
  }

  async function deleteTrade(tradeId: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/trades/${tradeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete trade");
      }

      // Remove the trade from state after successful deletion
      setUser(prevUser =>
        prevUser
          ? { ...prevUser, trades: prevUser.trades.filter(trade => trade.tradeId !== tradeId) }
          : null
      );
    } catch (error) {
      console.error("Error deleting trade:", error);
      alert(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }

  if (loading) return <Layout><div>Loading user profile...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;
  if (!user) return <Layout><div>User not found</div></Layout>;

  return (
    <Layout>
      <div className="container">
        {/* Profile Header */}
        <section className="profileSection">
          <div className="infoContainer">
            <h1 className="name">{user.username}</h1>
            <div className="metaItem">
              <span className="metaLabel">Friend Code:</span>
              <span className="friendCode">{user.friendId}</span>
              <button
                className="clipboardButton"
                onClick={() => copyToClipboard(user.friendId)}
              >
                <img src={clipboardIcon} alt="Copy Friend Code" className="clipboardButton" />
              </button>
            </div>
          </div>
        </section>

        {/* Published Listings */}
        <section className="listingsSection">
          <h2 className="sectionTitle">Active Trade Listings</h2>
          <div className="listingsGrid">
            {user.trades && user.trades.length > 0 ? (
              user.trades.map(trade => (
                <Link
                  to={`/listing/${trade.offeredCard.cardId}`}
                  key={trade.tradeId}
                  className="listingCard"
                >
                  <div className="listingInfo">
                    <div className="listingHeader">
                      <h3 className="listingTitle">{trade.offeredCard.name}</h3>
                      {loggedInUserId === userId && (
                        <button
                          className="trashButton"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteTrade(trade.tradeId);
                          }}
                        >
                          <img src={trashIcon} alt="Delete listing" className="trashButton" />
                        </button>
                      )}
                    </div>
                    <p className="listingSet">{trade.offeredCard.setName}</p>
                  </div>

                  <img
                    src={trade.offeredCard.cardImage}
                    alt={trade.offeredCard.name}
                    className="listingImage"
                  />

                  <div className="requestedCardsCount">
                    {[trade.requestedCard1, trade.requestedCard2, trade.requestedCard3, trade.requestedCard4]
                      .filter(card => card !== null).length} cards requested
                  </div>
                </Link>
              ))
            ) : (
              <p className="noListings">No active trade listings</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}