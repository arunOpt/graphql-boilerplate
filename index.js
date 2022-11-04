import { ApolloServer, gql } from "apollo-server";

//type defeniton inside gql
const typeDefs = gql`
  # optional as Query is default
  # schema {
  #   query: Query
  # }
  type Query {
    greeting: String
  }
`;

//resolveres should match exactly with type definition
const resolvers = {
  Query: {
    greeting: () => "Hello",
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
const serverInfo = await server.listen({ port: 9000 });
console.log(`Server running on ${serverInfo.url}`);
