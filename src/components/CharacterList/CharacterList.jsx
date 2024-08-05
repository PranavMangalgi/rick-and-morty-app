import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './characterList.module.css'
import CharacterCard from '../CharacterCard/CharacterCard'
import { CiSearch } from 'react-icons/ci'

import { GET_CHARACTERS } from '../apollo/queries'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

function CharacterList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [inputText, setInputText] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [searchFilter, setSearchFilter] = useState(
    location?.state?.filter || 'characters'
  )

  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  )

  useEffect(() => {
    if (searchParams.has('gender')) {
      setSearchFilter('gender')
    } else if (searchParams.has('species')) {
      setSearchFilter('species')
    } else if (searchParams.has('status')) {
      setSearchFilter('status')
    } else if (searchParams.has('type')) {
      setSearchFilter('type')
    }
  }, [searchParams])

  const payload = searchParams.get(searchFilter) || undefined

  const queryParams = useMemo(() => {
    let params = { page: currentPage }
    switch (searchFilter) {
      case 'characters':
        params.name = inputText || payload
        break
      case 'gender':
        params.gender = inputText || payload
        break
      case 'species':
        params.species = inputText || payload
        break
      case 'status':
        params.status = inputText || payload
        break
      case 'type':
        params.type = inputText || payload
        break
      default:
        break
    }
    return params
  }, [currentPage, inputText, searchFilter, payload])

  const { loading, data, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: queryParams,
    notifyOnNetworkStatusChange: true,
  })

  const [characterData, setCharacterData] = useState()

  const filteredData = useMemo(() => {
    if (!data?.characters?.results) return []

    const filteredResults = data?.characters?.results.filter((character) => {
      if (searchFilter === 'episodes') {
        return character?.episode?.some((ep) =>
          ep.name.toLowerCase().includes(inputText.toLowerCase().trim())
        )
      } else if (searchFilter === 'location') {
        return character?.location?.name
          .toLowerCase()
          .includes(inputText.toLowerCase().trim())
      } else {
        return true
      }
    })

    return {
      ...data,
      characters: { ...data.characters, results: filteredResults },
    }
  }, [data, inputText, searchFilter])

  useEffect(() => {
    if (searchFilter === 'episodes' || searchFilter === 'location') {
      setCharacterData(filteredData)
    } else {
      setCharacterData(data)
    }
  }, [data, inputText, filteredData, searchFilter])

  const debounce = useCallback((cb, delay = 1000) => {
    let timerId
    return (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => cb.apply(this, args), delay)
    }
  }, [])

  const debouncedSetInputText = debounce((text) => {
    setInputText(text)
    setCurrentPage(1)
  })

  const handleInputChange = useCallback(
    (e) => {
      const currentText = e.target.value
      setDisplayText(currentText)
      debouncedSetInputText(currentText)
    },
    [debouncedSetInputText]
  )

  console.log('+++', data)

  console.log('===', loading)

  if (error) {
    console.error('---', error.message)
  }

  const handlePrevPage = () => {
    if (data?.characters?.info?.prev && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      fetchMore({
        // variables: { page: currentPage - 1, name: inputText || undefined },
        variables: { ...queryParams, page: currentPage - 1 },
      })
    }
  }

  const handleNextPage = () => {
    if (data?.characters?.info?.next) {
      setCurrentPage((prev) => prev + 1)
      fetchMore({
        // variables: { page: currentPage + 1, name: inputText || undefined },
        variables: { ...queryParams, page: currentPage + 1 },
      })
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div className={styles.searchFilter}>
        <div className={styles.searchBar}>
          <CiSearch className="search-icon" style={{ color: 'white' }} />

          <input
            type="text"
            value={displayText}
            onChange={handleInputChange}
            placeholder={payload || `Search for ${searchFilter}`}
          />
        </div>
        <div className={styles.filterData}>
          <select
            id="states"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <option value="characters">Characters</option>
            <option value="status">Status</option>
            <option value="location">Location</option>
            <option value="episodes">Episodes</option>
            <option value="gender">Gender</option>
            <option value="species">Species</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>

      <div className={styles.cardList}>
        {characterData?.characters?.results?.length > 0 &&
          characterData?.characters?.results?.map((character) => (
            <Link to={`/character/${character.id}`} key={character.id}>
              <CharacterCard character={character} loading={loading} />
            </Link>
          ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ cursor: currentPage === 1 && 'not-allowed' }}
        >
          Previous
        </button>
        <div>{currentPage}</div>
        <button
          onClick={handleNextPage}
          disabled={!data?.characters?.info?.next}
          style={{ cursor: !data?.characters?.info?.next && 'not-allowed' }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CharacterList
