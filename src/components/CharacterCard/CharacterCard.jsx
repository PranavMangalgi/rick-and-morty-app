import styles from './characterCard.module.css'
import PropTypes from 'prop-types'

function getColorStatus(status) {
  switch (status) {
    case 'Dead':
      return 'red'
    case 'Alive':
      return 'green'
    default:
      return 'grey'
  }
}

function CharacterCard({ character, loading }) {
  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={character.image}
          alt="image-not-found"
          className={styles.img}
        />
      </div>

      <div className={styles.info}>
        <h2>{character.name}</h2>
        <div>
          <strong>
            <span style={{ color: getColorStatus(character.status) }}>•</span>{' '}
            {character.status} - {character.species}
          </strong>
        </div>

        <div className={styles.lastAndFirstSeen}>
          <div>Last Known Location:</div>
          <div>{character.location.name}</div>
        </div>

        <div className={styles.lastAndFirstSeen}>
          <div>First Seen in:</div>
          <div>{character.episode[0].name}</div>
        </div>
      </div>
    </div>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    episode: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CharacterCard
