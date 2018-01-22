import Express from 'express'
import GraphHTTP from 'express-graphql'
// import Path from 'path'
import ServeStatic from 'serve-static'
import Schema from './schema'

// Config
const APP_PORT = 8888
const app = Express()
app.use(ServeStatic(__dirname))
app.use(
  '/api',
  GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true,
  })
)

app.listen(process.env.PORT || APP_PORT, () => {
  console.log(`ETM API listening on port ${APP_PORT}`)
})
