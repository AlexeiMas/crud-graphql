import {gql} from "../__generated__"

const GET_DIRECTORS = gql(`
  query GetAllDirectors ($name: String) {
    directors(name: $name) {
      id
      name
      age
      movies {
        id
        name
      }
    }
}
`)

const GET_DIRECTOR_BY_ID = gql(`
  query GetDirectorById ($id: ID) {
    director(id: $id) {
      id
      name
      age
      movies {
        id
        name
        genre
      }
    }
}
`)

const GET_DIRECTORS_FOR_SELECTOR = gql(`
  query GetDirectorNames ($name: String) {
    directors(name: $name) {
      id
      name
    }
}
`)

export {GET_DIRECTORS, GET_DIRECTOR_BY_ID, GET_DIRECTORS_FOR_SELECTOR}