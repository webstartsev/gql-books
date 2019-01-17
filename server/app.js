const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { dbuser, dbpass, dburl } = require('./config');

const app = express();

const mongodbUri = 'mongodb://' + dbuser + ':' + dbpass + '@' + dburl;
const conn = mongoose.connection;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true
});

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  console.log('connected to database');
});


app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Hi!');
});

