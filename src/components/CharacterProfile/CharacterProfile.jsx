import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_CHARACTER_BYID } from '../apollo/queries'
import styles from './characterProfile.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'

function CharacterProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, data, error } = useQuery(GET_CHARACTER_BYID, {
    variables: { ids: [id] },
  })

  const [characterData, setCharacterData] = useState(null)

  useEffect(() => {
    if (data?.charactersByIds.length > 0) {
      setCharacterData(data.charactersByIds[0])
    }
  }, [data])

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>Error: {error.message}</p>

  if (!characterData) return <p>No character data found.</p>

  console.log('ddd', characterData)

  return (
    <div className={styles.characterInfo}>
      <div className={styles.upperLeftSide}>
        <div className={styles.backBtn} onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> <div>Back</div>
        </div>
        <div className={styles.image}>
          <img
            src={characterData.image}
            alt={characterData.name}
            className={styles.img}
          />
        </div>
      </div>

      <div className={styles.details}>
        <h1>{characterData.name}</h1>
        <p>
          <strong>Gender:</strong> {characterData.gender}
        </p>
        <p>
          <strong>Species:</strong> {characterData.species}
        </p>
        <p>
          <strong>Status:</strong> {characterData.status}
        </p>
        {characterData.type && (
          <p>
            <strong>Type:</strong> {characterData.type}
          </p>
        )}
        <h2>Origin</h2>
        <p>{characterData.origin.name}</p>
        <h2>Location</h2>
        <p>{characterData.location.name}</p>
        <p>
          <strong>Dimension:</strong> {characterData.location.dimension}
        </p>
        <p>
          <strong>No. of Residents:</strong>{' '}
          {characterData.location.residents.length}
        </p>

        <p className={styles.episodes}>
          <strong>Episodes featured in: </strong>
          <span>
            {characterData?.episode.map((episode, idx) => (
              <div key={idx}>{episode.name}, </div>
            ))}
          </span>
        </p>
      </div>
    </div>
  )
}

export default CharacterProfile
