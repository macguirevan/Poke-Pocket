import Layout from "../../layout/Layout"

export default function User() {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    bio: "Frontend developer passionate about creating user-friendly interfaces.",
    avatar: "",
    joined: "January 2023",
    posts: 42,
    followers: 1350
  };

  return (
    <Layout>
      <div style={styles.container}>
        <section style={styles.profileSection}>
          <div style={styles.avatarContainer}>
            <img 
              src={user.avatar} 
              alt="User avatar" 
              style={styles.avatar}
            />
          </div>
          <div style={styles.infoContainer}>
            <h1 style={styles.name}>{user.name}</h1>
            <p style={styles.email}>{user.email}</p>
            <p style={styles.bio}>{user.bio}</p>
            <div style={styles.stats}>
              <p>Member since: {user.joined}</p>
              <ul style={styles.statsList}>
                <li style={styles.statItem}>{user.posts} Posts</li>
                <li style={styles.statItem}>{user.followers} Followers</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={styles.actions}>
          <button 
            style={styles.button}
            onClick={() => console.log('Edit profile clicked')}
          >
            Edit Profile
          </button>
        </section>
      </div>
    </Layout>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  },
  profileSection: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  avatarContainer: {
    flexShrink: 0
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  infoContainer: {
    flexGrow: 1
  },
  name: {
    fontSize: '2rem',
    margin: '0 0 0.5rem 0',
    color: '#333'
  },
  email: {
    color: '#666',
    margin: '0 0 1rem 0'
  },
  bio: {
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  stats: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  statsList: {
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  statItem: {
    backgroundColor: '#e0e0e0',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  },
  actions: {
    textAlign: 'center'
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  }
}