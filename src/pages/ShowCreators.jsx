import { Link } from 'react-router-dom'
import Card from '../components/Card'

function ShowCreators({ data }) {
  return (
    <div>
      <header className="hero">
        <span className="eyebrow">Your favorite creators, in one place</span>
        <h1>
          Explore the <span className="gradient-text">Creatorverse</span>
        </h1>
        <p>
          A curated galaxy of the streamers, channels, and creators worth
          following. Add your own and build your constellation. ✦
        </p>
      </header>

      <main className="page">
        <div className="section-head">
          <h2>All Creators</h2>
          <span className="count-pill">{data.length} creators</span>
        </div>

        {data.length === 0 ? (
          <div className="empty">
            <div className="emoji">🛸</div>
            <h3>No creators yet</h3>
            <p>Your Creatorverse is empty — add the first star to the map.</p>
            <Link to="/creator/add" className="btn btn-primary">
              ＋ Add a Creator
            </Link>
          </div>
        ) : (
          <div className="grid">
            {data.map((creator) => (
              <Card key={creator.id} {...creator} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ShowCreators
