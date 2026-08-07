import credits from '../data/photo-credits.json'

export const slugify = (name) =>
  name.toLowerCase().replace(/[.'’]/g, '').replace(/\s+/g, '-')

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

// Every photo here is Wikimedia Commons under a free license; the required
// attribution is rendered by <Credits />. People with no free photo get an
// initials avatar rather than a non-free image.
export default function Avatar({ name, size = 32 }) {
  const credit = credits[slugify(name)]
  const style = { width: size, height: size }
  if (credit) {
    return (
      <img
        className="avatar"
        src={`/headshots/${credit.file}`}
        style={style}
        alt=""
        loading="lazy"
      />
    )
  }
  return (
    <span className="avatar avatar-initials" style={style} aria-hidden="true">
      {initials(name)}
    </span>
  )
}
