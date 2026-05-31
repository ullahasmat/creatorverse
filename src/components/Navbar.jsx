import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="logo">✦</span>
        <span>
          Creator<span className="gradient-text">verse</span>
        </span>
      </Link>
      <Link to="/creator/add" className="btn btn-primary">
        ＋ Add Creator
      </Link>
    </nav>
  )
}

export default Navbar
