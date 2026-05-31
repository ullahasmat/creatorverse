import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator({ onCreated = () => {} }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
  })

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // Create a new creator
  const addCreator = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('creators').insert([form])
    if (error) {
      console.error('Error adding creator:', error)
      alert(`Could not add creator: ${error.message}`)
      return
    }
    onCreated()
    navigate('/')
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <form className="form-card" onSubmit={addCreator}>
        <h1>Add a Creator</h1>
        <p className="sub">Add a new star to your Creatorverse. ✦</p>

        <div className="field">
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="field">
          <input
            id="url"
            name="url"
            type="url"
            value={form.url}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="url">Channel / Page URL (https://…)</label>
        </div>

        <div className="field">
          <input
            id="imageURL"
            name="imageURL"
            type="url"
            value={form.imageURL}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="imageURL">Image URL (optional)</label>
        </div>

        <div className="field">
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="description">Description</label>
        </div>

        <p className="sub" style={{ marginBottom: 18 }}>
          Social media links (optional)
        </p>

        <div className="field">
          <input
            id="youtube"
            name="youtube"
            type="url"
            value={form.youtube}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="youtube">YouTube URL</label>
        </div>

        <div className="field">
          <input
            id="instagram"
            name="instagram"
            type="url"
            value={form.instagram}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="instagram">Instagram URL</label>
        </div>

        <div className="field">
          <input
            id="facebook"
            name="facebook"
            type="url"
            value={form.facebook}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="facebook">Facebook URL</label>
        </div>

        <div className="field">
          <input
            id="twitter"
            name="twitter"
            type="url"
            value={form.twitter}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="twitter">X (Twitter) URL</label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            ✦ Add Creator
          </button>
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddCreator
