import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router'

const app = new Koa()
const port = process.env.PORT || 8080

async function start() {
  app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods('GET,POST'));

  const server = app.listen(port, () => {
    console.info(`Listening on port ${port}`)
  })

  process.once('SIGTERM', () => {
    console.warn('SIGTERM received, shutting down')
    try {
      server.close((err) => {
        if (err) {
          throw err
        }
        process.exit(0)
      })
    } catch (err) {
      console.error('Could not shutdown gracefully', { err })
      process.exit(1)
    }
  })
}

start()