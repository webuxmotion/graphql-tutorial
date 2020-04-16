const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

const Movies = require('../models/movie');
const Directors = require('../models/director');

/*
const movies = [
	{ "name": "Pulp Fiction", "genre": "Crime", "directorId": "5e98a07de7179a52a760aa7a" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5e98a07de7179a52a760aa7a" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5e98a092e7179a52a760aba2" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5e98a092e7179a52a760aba2" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5e98a09fe7179a52a760ac58" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5e98a09fe7179a52a760ac58" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5e98a0a6e7179a52a760ac68" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5e98a0a6e7179a52a760ac68" },
]

const directors = [
	{ "name": "Quentin Tarantino", "age": 55 }, // 5e98a07de7179a52a760aa7a
  { "name": "Michael Radford", "age": 72 }, // 5e98a092e7179a52a760aba2
  { "name": "James McTeigue", "age": 51 }, // 5e98a09fe7179a52a760ac58
  { "name": "Guy Ritchie", "age": 50 }, // 5e98a0a6e7179a52a760ac68
]
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        //return directors.find(director => director.id === parent.id);
        return Directors.findById(parent.directorId);
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        //return movies.filter(movie => movie.directorId == parent.id)
        return Movies.find({ directorId: parent.id });
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return movies.find(movie => movie.id == args.id);
        return Movies.findById(args.id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return directors.find(director => director.id === args.id);
        return Directors.findById(args.id);
      },
    },
    movies: {
			type: new GraphQLList(MovieType),
			resolve() {
        //return movies;
        return Movies.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve() {
        //return directors;
        return Directors.find({});
			}
		}
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})
