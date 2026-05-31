import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)
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

  // Read the creator and pre-fill the form
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
          youtube: data.youtube || '',
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
        })
      }
    }
    fetchCreator()
  }, [id])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // Update the creator
  const updateCreator = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL,
        youtube: form.youtube,
        instagram: form.instagram,
        facebook: form.facebook,
        twitter: form.twitter,
      })
      .eq('id', id)
    if (error) console.error('Error updating creator:', error)
    else navigate(`/creator/${id}`)
  }

  // Delete the creator
  const deleteCreator = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) console.error('Error deleting creator:', error)
    else navigate('/')
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <form className="form-card" onSubmit={updateCreator}>
        <h1>Edit Creator</h1>
        <p className="sub">Update the details or remove this creator.</p>

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
            💾 Save Changes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setConfirming(true)}
          >
            🗑 Delete
          </button>
        </div>
      </form>

      {confirming && (
        <div className="overlay" onClick={() => setConfirming(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="warn">⚠️</div>
            <h3>Delete {form.name}?</h3>
            <p>This will permanently remove them from your Creatorverse.</p>
            <div className="form-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={deleteCreator}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditCreator
