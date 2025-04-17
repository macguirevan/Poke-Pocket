import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './Home.css';

const mockListings = Array(20).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Heracross ${i + 1}`,
  image: 'https://pocket.pokemongohub.net/_next/image?url=%2Ftcg-pocket%2Fcards%2Fa2a%2Fwebp%2FcPK_10_004250_00_HERACROS_U_M_M_en_US.webp&w=828&q=75'
}));

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

export default function Home() {
  return (
    <Layout>
      <div className="home-container">
        <section className="listings-section">
          <h2>Trending Listings</h2>
          <HorizontalScroll>
            {mockListings.map((listing) => (
              <div key={listing.id} className="card-wrapper">
                <Link to={`/listing/${listing.id}`}>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="card-image"
                  />
                  <div className="card-details">
                    <h3>{listing.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </section>

        <section className="listings-section">
          <h2>New Listings</h2>
          <HorizontalScroll>
            {[...mockListings].reverse().map((listing) => (
              <div key={listing.id} className="card-wrapper">
                <Link to={`/listing/${listing.id}`}>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="card-image"
                  />
                  <div className="card-details">
                    <h3>{listing.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </section>
      </div>
    </Layout>
  );
}