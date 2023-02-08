import {gql} from "../__generated__"

const ADD_NEW_DIRECTOR = gql(`
  mutation AddNewDirector ($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
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

const DEL_DIRECTOR = gql(`
  mutation DelDirector ($id: ID) {
    removeDirector(id: $id) {
      id
      name
    }
  }
`)

const UPDATE_DIRECTOR = gql(`
  mutation UpdateDirector ($id: ID!, $name: String!, $age: Int!) {
    updateDirector(id: $id, name: $name, age: $age) {
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

export {ADD_NEW_DIRECTOR, DEL_DIRECTOR, UPDATE_DIRECTOR}