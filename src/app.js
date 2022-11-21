const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const session = require('koa-session');
const orm = require('./models');
const router = require('./routes');

const PORT = 8000;

const app = new Koa();

// Expose ORM to koa ctx
app.context.orm = orm;

// Por si hay problemas de cors
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://poetic-croissant-5e5bde.netlify.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Logs requests from server
app.use(KoaLogger());

// Parse request body
app.use(koaBody());

// Koa-session
app.keys = [`${process.env.APP_KEYS}`];

const CONFIG = {
  httpOnly: false,
};

app.use(session(CONFIG, app));

// Para escuchar el resto de las páginas
app.use(router.routes());

module.exports = app;
