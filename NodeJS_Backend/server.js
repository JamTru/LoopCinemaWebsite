// Requires Express
const express = require("express");
const cors = require("cors");
const db = require("./database");

// Added For GraphQL Support
const { graphqlHTTP } = require("express-graphql");
const graphql = require("./src/graphql");

db.sync();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req,res) => {
  res.json({message:"Test Message Please Confirm"});
});

// Add GraphQL to express server.
// NOTE: You can use the GraphQL web-interface to test the GraphQL schema thanks to the graphiql parameter being true.
// Access the web-interface when the server is running here: http://localhost:4000/graphql
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphql.schema,
//     rootValue: graphql.root,
//     graphiql: true
//   })
// );


require("./routes/userRoutes.js")(express, app);
require("./routes/movieRoutes.js")(express, app);
require("./routes/reviewRoutes.js")(express, app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
