import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query getCharacters(
    $page: Int
    $name: String
    $gender: String
    $species: String
    $status: String
    $type: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        gender: $gender
        species: $species
        status: $status
        type: $type
      }
    ) {
      info {
        next
        count
        prev
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          name
        }
      }
    }
  }
`

export const GET_CHARACTER_BYID = gql`
  query getCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      image
      gender
      name
      species
      status
      type
      id
      origin {
        name
        residents {
          name
          id
        }
      }
      location {
        id
        name
        dimension
        residents {
          name
        }
      }
      episode {
        name
      }
    }
  }
`
