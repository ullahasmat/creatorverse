import { useNavigate } from 'react-router-dom'
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import { getPlatform } from '../utils/platform'

function Card({
  id,
  name,
  url,
  description,
  imageURL,
  youtube,
  instagram,
  facebook,
  twitter,
}) {
  const navigate = useNavigate()
  const platform = getPlatform(url)

  const goToCreator = () => navigate(`/creator/${id}`)

  const socials = [
    { href: youtube, Icon: FaYoutube, cls: 'youtube', label: 'YouTube' },
    { href: instagram, Icon: FaInstagram, cls: 'instagram', label: 'Instagram' },
    { href: facebook, Icon: FaFacebook, cls: 'facebook', label: 'Facebook' },
    { href: twitter, Icon: FaXTwitter, cls: 'twitter', label: 'X (Twitter)' },
  ].filter((s) => s.href)

  return (
    <article
      className="card"
      onClick={goToCreator}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && goToCreator()}
    >
      {imageURL ? (
        <div
          className="card-banner"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      ) : (
        <div className="card-banner placeholder">{platform.icon}</div>
      )}

      <div className="card-body">
        <span className="badge">
          {platform.icon} {platform.label}
        </span>

        <h3 className="card-name">{name}</h3>
        <p className="card-desc">{description}</p>

        {socials.length > 0 && (
          <div className="socials">
            {socials.map(({ href, Icon, cls, label }) => (
              <a
                key={cls}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className={`social-icon ${cls}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon />
              </a>
            ))}
          </div>
        )}

        <div className="card-foot">
          <span className="explore">View →</span>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="badge"
            >
              Visit ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default Card
