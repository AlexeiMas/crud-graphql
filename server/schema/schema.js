const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull,
  GraphQLBoolean
} = require("graphql");

const Movies = require('../models/movie')
const Directors = require('../models/director')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    genre: {type: new GraphQLNonNull(GraphQLString)},
    watched: {type: new GraphQLNonNull(GraphQLBoolean)},
    rate: {type: GraphQLInt},
    director: {
      type: DirectorType,
      resolve({directorId}, args) { // parent, args
        return Directors.findById(directorId)
      }
    },
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    age: {type: new GraphQLNonNull(GraphQLInt)},
    movies: {
      type: new GraphQLList(MovieType),
      resolve({id}, args) {
        return Movies.find({directorId: id})
      }
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, {name, age}) {
        const director = new Directors({
          name: name,
          age: age
        });
        return director.save()
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        directorId: {type: GraphQLID},
        watched: {type: new GraphQLNonNull(GraphQLBoolean)},
        rate: {type: GraphQLInt},
      },
      resolve(parent, {name, genre, directorId, watched, rate}) {
        const movie = new Movies({
          name: name,
          genre: genre,
          directorId: directorId,
          watched: watched,
          rate: rate
        })
        return movie.save()
      }
    },
    removeDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, {id}) {
        return Directors.findByIdAndRemove(id)
      }
    },
    removeMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, {id}) {
        return Movies.findByIdAndRemove(id)
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, {id, name, age}) {
        return Directors.findByIdAndUpdate(
          id,
          {$set: {name: name, age: age}},
          {new: true, runValidators: true}
        )
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        directorId: {type: GraphQLID},
        watched: {type: new GraphQLNonNull(GraphQLBoolean)},
        rate: {type: GraphQLInt},
      },
      resolve(parent, {id, name, genre, directorId, watched, rate}) {
        return Movies.findByIdAndUpdate(
          id,
          {$set: {name: name, genre: genre, directorId: directorId, watched: watched, rate: rate}},
          {new: true, runValidators: true}
        )
      }
    }
  }
})


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, {id}) {
        return Movies.findById(id)
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, {id}) {
        return Directors.findById(id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: {name: {type: GraphQLString}},
      resolve(parent, {name}) {
        return Movies.find({name: {$regex: name, $options: "i"}})
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: {name: {type: GraphQLString}},
      resolve(parent, {name}) {
        return Directors.find({name: {$regex: name, $options: "i"}})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})