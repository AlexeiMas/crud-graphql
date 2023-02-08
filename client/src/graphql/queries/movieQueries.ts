import {gql} from "../__generated__"

const GET_MOVIES = gql(`
  query GetAllMovies ($name: String) {
    movies(name: $name) {
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

const GET_MOVIE_BY_ID = gql(`
  query GetMovieById ($id: ID) {
    movie(id: $id) {
      id
      name
      genre
      watched
      rate
      director {
        id
        name
      }
    }
}
`)

export {GET_MOVIES, GET_MOVIE_BY_ID}
