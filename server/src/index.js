import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema.js";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

import fs from "node:fs";
import resolvers from "./resolvers.js";
import { parse } from "node:path";

async function readFile() {
  try {
    const data = await fs.promises.readFile(
      "./src/mocks/activities.json",
      "utf8"
    );
    return data; // Directly return the resolved data
  } catch (err) {
    console.error(err);
    throw err; // Or handle the error as needed (return a default value, etc.)
  }
}

async function startApolloServer() {
  const mockActivity = await readFile();
  const parsedMockedActivity = JSON.parse(mockActivity);
  console.log({ parsedMockedActivity });

  const newObject = {};
  for (const p in parsedMockedActivity) {
    console.log({ key: p, value: parsedMockedActivity[p] });
    newObject[p] = parsedMockedActivity[p];
  }

  // console.log({ newObject });

  const mocks = {
    Query: () => ({
      getAtheteActivities: [newObject],
    }),
    Activity: () => newObject,
  };

  console.log(mocks.Activity.name);

  // const server = new ApolloServer({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });

  const { url } = await startStandaloneServer(server);
  console.log(`
    Server is running!
    Query at ${url}
  `);
  // const { url } = await startStandaloneServer(server, {
  //   context: async () => {
  //     const { cache } = server;

  //     return {
  //       dataSources: {
  //         activitiesAPI: new
  //       }
  //     }
  //   }
  // })
}

startApolloServer();
