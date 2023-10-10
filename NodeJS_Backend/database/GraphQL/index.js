const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");

// Create and track a GraphQL PubSub.
const pubsub = new PubSub();

const COMMENT_ADDED_TRIGGER = "COMMENT_ADDED";

// Schema.
const typeDefs = gql`
  type movies {
    movieID: Int!
    title: String!
    summary: String!
    genre: String!
    releaseDate: String!
    ageRatingAgeRating: ageRatings!
  }

  type ageRatings {
    ageRating: String!
  }

  input movieInput {
    title: String,
    summary: String,
    genre: String
    releaseDate: String
    ageRatingAgeRating: String
  }

  type Query {
    allMovies: [movies]
  }

  type Mutation {
     createMovie(input: movieInput): movies,
     updateMovie(input: movieInput): movies,
  }

`;

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  allMovies: async () => {
    return await db.movies.findAll({ include: { model: db.ageRating, as: "ageRatings" } });
  },
  owner: async (args) => {
    return await db.owner.findByPk(args.email);
  },
  owner_exists: async (args) => {
    const count = await db.owner.count({ where: { email: args.email } });

    return count === 1;
  },

  // Mutations.
  create_owner: async (args) => {
    const owner = await db.owner.create(args.input);

    return owner;
  },
  update_owner: async (args) => {
    const owner = await db.owner.findByPk(args.input.email);

    // Update owner fields.
    owner.first_name = args.input.first_name;
    owner.last_name = args.input.last_name;

    await owner.save();

    return owner;
  },
  delete_owner: async (args) => {
    const owner = await db.owner.findByPk(args.email);

    if(owner === null)
      return false;

    // First remove all pets owned by the owner.
    await db.pet.destroy({ where: { email: owner.email } });
    await owner.destroy();

    return true;
  }
};

module.exports = {
  typeDefs, resolvers
};
