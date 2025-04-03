// In Listing.jsx
import { useParams, Link } from 'react-router-dom'
import Layout from '../../layout/Layout'
import './Listing.css'

// Updated mock data with trade requests
const mockListings = Array(20).fill().map((_, i) => ({
  id: i,
  title: `Heracross ${i}`,
  image: 'https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75',
  requestedCards: Array(4).fill().map((_, j) => (i + j + 1) % 20) // Example requested card IDs
}));

// In Listing.jsx
export default function Listing() {
  const { id } = useParams()
  const listing = mockListings.find(item => item.id === Number(id))

  if (!listing) {
    return (
      <Layout>
        <div className="error">Listing not found</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="listing-container">
        {/* Left Side - Fixed Card Details */}
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
              {/* Add more details here */}
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Trade Section */}
        <div className="right-column">
          <div className="trade-section">
            <h2>Requested Trades</h2>
            <div className="requested-cards-grid">
              {listing.requestedCards.map((requestedId, index) => {
                const requestedCard = mockListings.find(c => c.id === requestedId)
                return requestedCard ? (
                  <div key={index} className="trade-card">
                    <Link to={`/listing/${requestedCard.id}`}>
                      <img
                        src={requestedCard.image}
                        alt={requestedCard.title}
                        className="trade-card-image"
                      />
                      <div className="trade-card-info">
                        <h3>{requestedCard.title}</h3>
                        <p>ID: {requestedCard.id}</p>
                      </div>
                    </Link>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}