require('dotenv').config({path: __dirname+'/.env.local'})
const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const dbConnection = require('./db')

const PORT = process.env.port || 5000

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

dbConnection()
  .then(() => {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`Server was running on port ${PORT} ...`)
    })
  })
  .catch((e) => console.log('ERROR', e))
