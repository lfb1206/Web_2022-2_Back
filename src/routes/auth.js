const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const parametros = require('./utiles/parametros');

const router = new Router();

// Realizar login
router.post('/login', async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({
      where: { email: ctx.request.body.email },
    });

    if (user) {
      const condicion = await bcrypt.compare(ctx.request.body.password, user.hash_contrasena);
      if (condicion) {
        // Se busca el id de todas las partidas creadas por el usuario
        const idmatches = await ctx.orm.Match.findAll({
          attributes: ['id'],
          where: { usuario_creador: user.id },
        });
        // crear nueva sesion
        const newSession = await ctx.orm.Session.create({ userId: user.id });
        ctx.session.sessionid = newSession.id;

        let respuesta = false;
        if (user.username === parametros.nombreAdmin) {
          respuesta = true;
        }
        // Buscar agregar el token
        const payload = { matches: idmatches };
        const tokenEnvio = JWT.sign(payload, `${process.env.JWT_SECRET}`);

        ctx.body = { admin: respuesta };
        ctx.response.body = { token: tokenEnvio, admin: respuesta };

        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { detail: JSON.stringify('Contraseña incorrecta') };
      }
    } else {
      ctx.status = 404;
      ctx.body = { detail: JSON.stringify('Usuario no encontrado') };
    }
  } catch (error) {
    ctx.throw(error);
    ctx.status = 400;
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo realizar login') };
  }
});

// Crear un usuario
router.post('player.create', '/signup', async (ctx) => {
  try {
    if (!(ctx.request.body.email === undefined || ctx.request.body.password === undefined)) {
      // Se hashea la contraseña
      const hashContrasena = await bcrypt.hash(ctx.request.body.password, 5);

      // Se verifica que el username no este duplicado
      const DiccionarioNombres = await ctx.orm.User.findAll({
        attributes: ['username'],
      });
      const nombres = [];

      DiccionarioNombres.forEach((nom) => {
        nombres.push(nom.dataValues.username);
      });

      const DiccionarioMails = await ctx.orm.User.findAll({
        attributes: ['email'],
      });
      const mails = [];

      DiccionarioMails.forEach((mail) => {
        mails.push(mail.dataValues.email);
      });

      if (nombres.includes(ctx.request.body.username)) {
        ctx.body = { detail: JSON.stringify('Mail o usuario ya utilizado') };
        ctx.status = 400;
      } else if (mails.includes(ctx.request.body.email)) {
        ctx.body = { detail: JSON.stringify('Mail o usuario ya utilizado') };
        ctx.status = 400;
      } else {
        const user = await ctx.orm.User.create({
          username: ctx.request.body.username,
          hash_contrasena: hashContrasena,
          email: ctx.request.body.email,
          nivel: 1,
          avatar: 'No_existe',
          victorias: 0,
        });
        // Se busca el id de todas las partidas creadas por el usuario
        const idmatches = await ctx.orm.Match.findAll({
          attributes: ['id'],
          where: { usuario_creador: user.id },
        });
        console.log('Partidas creadas', idmatches);
        // crear nueva sesion
        const newSession = await ctx.orm.Session.create({ userId: user.id });
        ctx.session.sessionid = newSession.id;

        const payload = { matches: idmatches };
        const tokenEnvio = JWT.sign(payload, `${process.env.JWT_SECRET}`);

        ctx.response.body = { usuario: user, token: tokenEnvio };
        ctx.status = 201;
      }
    } else {
      ctx.body = { detail: JSON.stringify('No se entrego mail o contraseña') };
      ctx.status = 400;
    }
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo crear el usuario') };
    ctx.status = 400;
  }
});

// Realizar logout
router.post('/logout', async (ctx) => {
  try {
    await ctx.orm.Session.destroy({
      where: { id: `${ctx.session.sessionid}` },
    });
    ctx.session.sessionid = undefined;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo salir de la cuenta') };
    ctx.status = 400;
  }
});

module.exports = router;
