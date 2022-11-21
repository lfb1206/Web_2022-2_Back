const Router = require('koa-router');

const parametros = require('./utiles/parametros');

const router = new Router();

// Verificar si es admin
router.get('/verificar', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const userid = session.userId;
    const usuario = await ctx.orm.User.findOne({ where: { id: userid } });
    let respuesta = false;
    if (usuario.username === parametros.nombreAdmin) {
      respuesta = true;
    }
    ctx.body = { admin: respuesta };
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo realizar la verificación') };
    ctx.status = 400;
  }
});

// Mostrar las partidas
router.get('/matches', async (ctx) => {
  try {
    const infoPartidas = await ctx.orm.Match.findAll();
    ctx.body = infoPartidas;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudieron obtener las partidas') };
    ctx.status = 400;
  }
});

// Mostrar las usuarios
router.get('/users', async (ctx) => {
  try {
    const infoUsuarios = await ctx.orm.User.findAll();
    ctx.body = infoUsuarios;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudieron obtener los usuarios') };
    ctx.status = 400;
  }
});

// Borrar match
router.delete('/deleteMatch/:IdMatch', async (ctx) => {
  try {
    await ctx.orm.Match.destroy({
      where: { id: ctx.params.IdMatch },
    });
    ctx.status = 204;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se ha podido eliminar la partida') };
    ctx.status = 400;
  }
});

// Borrar usuario
router.delete('/deleteUser/:IdUser', async (ctx) => {
  try {
    await ctx.orm.Session.destroy({ where: { userId: ctx.params.IdUser } });
    const personajes = await ctx.orm.Player.findAll({ where: { UserId: ctx.params.IdUser } });

    personajes.forEach(async (personaje) => {
      const borrado = await ctx.orm.Match.destroy({ where: { id: personaje.MatchId } });
    });

    await ctx.orm.User.destroy({
      where: { id: ctx.params.IdUser },
    });
    ctx.status = 204;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se ha podido eliminar al usuario') };
    ctx.status = 400;
  }
});

// Backup de los datos
router.get('/backup', async (ctx) => {
  try {
    const infoUsuarios = await ctx.orm.User.findAll();
    ctx.body = infoUsuarios;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudieron obtener los usuarios') };
    ctx.status = 400;
  }
});

module.exports = router;
