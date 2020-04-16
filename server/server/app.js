const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const PORT = 3005

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MLAB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(error) : console.log(`Server started! on http://localhost:${PORT}/graphql`)
})
