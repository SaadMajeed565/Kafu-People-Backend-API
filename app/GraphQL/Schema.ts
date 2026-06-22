import { buildSchema } from 'bushjs';
import { rootValue } from './Resolvers';

export const schema = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    userByEmail(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`);

export { rootValue };
