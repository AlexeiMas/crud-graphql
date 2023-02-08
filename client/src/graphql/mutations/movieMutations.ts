import {gql} from "../__generated__"

const ADD_NEW_MOVIE = gql(`
  mutation AddNewMovie ($name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int) {
    addMovie(name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
      id
      name
      genre
      watched
      rate
      director {
        name
      }
    }
  }
`)

const DEL_MOVIE = gql(`
  mutation DelMovie ($id: ID) {
    removeMovie(id: $id) {
      id
      name
    }
  }
`)

const UPDATE_MOVIE = gql(`
  mutation UpdateMovie ($id: ID!, $name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
      id
      name
      genre
      watched
      rate
      director {
        name
      }
    }
  }
`)

export {ADD_NEW_MOVIE, DEL_MOVIE, UPDATE_MOVIE}