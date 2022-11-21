const Router = require('koa-router');
const koaJWT = require('koa-jwt');
const protectedRoute = require('./routes/protected');
const config = require('./routes/config');
const perfil = require('./routes/perfil');
const partidas = require('./routes/partidas');
const juego = require('./routes/juego');
const admin = require('./routes/admin');
const authMiddle = require('./middlewares/auth');
const auth = require('./routes/auth');

const router = new Router();

router.use('/auth', auth.routes());

router.use('/perfil', authMiddle, perfil.routes());
router.use('/partidas', authMiddle, partidas.routes());
router.use('/config', authMiddle, config.routes());
router.use('/juego', authMiddle, juego.routes());
router.use('/admin', authMiddle, admin.routes());

router.use(koaJWT({ secret: `${process.env.JWT_SECRET}`, key: 'tokendata' }));

router.use('/protected', authMiddle, protectedRoute.routes());

module.exports = router;
