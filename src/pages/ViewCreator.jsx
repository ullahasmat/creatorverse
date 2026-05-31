import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'
import { getPlatform } from '../utils/platform'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) setCreator(data)
    }
    fetchCreator()
  }, [id])

  const deleteCreator = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) console.error('Error deleting creator:', error)
    else navigate('/')
  }

  if (!creator) return <p className="loading">Loading creator…</p>

  const platform = getPlatform(creator.url)

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <div className="view-wrap">
        {creator.imageURL ? (
          <div className="view-media">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        ) : (
          <div className="view-media placeholder">{platform.icon}</div>
        )}

        <div className="view-info">
          <span className="badge">
            {platform.icon} {platform.label}
          </span>
          <h1>{creator.name}</h1>
          <p className="desc">{creator.description}</p>

          {creator.url && (
            <a
              className="view-link"
              href={creator.url}
              target="_blank"
              rel="noreferrer"
            >
              🔗 {creator.url}
            </a>
          )}

          <div className="actions">
            <Link className="btn btn-primary" to={`/creator/${creator.id}/edit`}>
              ✏️ Edit
            </Link>
            <button className="btn btn-danger" onClick={() => setConfirming(true)}>
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {confirming && (
        <div className="overlay" onClick={() => setConfirming(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="warn">⚠️</div>
            <h3>Delete {creator.name}?</h3>
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

export default ViewCreator
