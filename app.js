const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const signin = require('./routes/sigin')
const signup = require('./routes/signup')
const signout = require('./routes/signout')
const posts = require('./routes/posts')
let config = require('./config/default')
let ejs = require('ejs')
let session = require('koa-session-minimal')
let MysqlStore = require('koa-mysql-session')
// error handler
onerror(app)

// middlewares
const sessionMysqlConfig = {
  user: config.database.USERNSME,
  password: config.database.PASSWOED,
  database: config.database.DATABASE,
  port: config.database.PORT,
  host: config.database.HOST
}
app.use(session({
  key: config.session.KEY,
  store: new MysqlStore(sessionMysqlConfig)
}))

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// app.use(signin.routes(), signin.allowedMethods())
app.use(signup.routes(), signup.allowedMethods())
// app.use(signout.routes(), signout.allowedMethods())
// app.use(posts.routes(), posts.allowedMethods())

module.exports = app
