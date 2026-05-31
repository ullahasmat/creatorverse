// Derive a platform badge (icon + label) from a creator's URL.
export function getPlatform(url = '') {
  const u = url.toLowerCase()
  if (u.includes('youtube') || u.includes('youtu.be'))
    return { icon: '▶️', label: 'YouTube' }
  if (u.includes('twitch')) return { icon: '🎮', label: 'Twitch' }
  if (u.includes('tiktok')) return { icon: '🎵', label: 'TikTok' }
  if (u.includes('instagram')) return { icon: '📸', label: 'Instagram' }
  if (u.includes('twitter') || u.includes('x.com'))
    return { icon: '🐦', label: 'Twitter' }
  if (u.includes('mastodon')) return { icon: '🐘', label: 'Mastodon' }
  return { icon: '🌐', label: 'Web' }
}
