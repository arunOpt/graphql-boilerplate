import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { User } from "./db.js";

import { resolvers } from "./resolvers.js";
import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";

const PORT = 9000;
const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");
const app = express();
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

const typeDefs = await readFile("./schema.graphql", "utf-8");
const context = async ({ req }) => {
  if (req?.auth) {
    const user = await User.findById(req.auth.sub);
    return { user };
  }
  return {};

  //  auth: req.auth, method: req.method }
};
//using context we can send some data specific to a request and use it inside any data as a third arg in resolver
//
const appoloServer = new ApolloServer({ typeDefs, resolvers, context });
await appoloServer.start();
appoloServer.applyMiddleware({ app, path: "/graphql" }); //default "./graphql"

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`graphql running on port: http://localhost:${PORT}/graphql`);
});
