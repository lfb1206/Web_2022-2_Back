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
app.use(cors(cors({
  origin: ["*"],
  credentials: true,
  preflightContinue: false,
})));

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
