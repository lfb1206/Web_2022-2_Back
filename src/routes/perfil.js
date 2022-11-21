const Router = require('koa-router');

const bcrypt = require('bcrypt');

const router = new Router();

// Mostrar un perfil
router.get('perfil.show', '/show', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const user = session.userId;
    const perfil = await ctx.orm.User.findByPk(user);
    ctx.body = perfil;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo obtener el perfil') };
    ctx.status = 400;
  }
});

// Borrar usuario
router.delete('/delete', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const userid = session.userId;
  const user = await ctx.orm.User.findByPk(userid);

  try {
    await ctx.orm.Session.destroy({ where: { userId: userid } });
    ctx.session.sessionid = undefined;
    await user.destroy();
    ctx.status = 204;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo eliminar al usuario') };
    ctx.status = 400;
  }
});

// Actualizar usuario
router.post('/update', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const userid = session.userId;
  try {
    if (ctx.request.body.variable === 'username') {
      await ctx.orm.User.update(
        { username: ctx.request.body.username },
        { where: { id: userid } },
      );
    }
    if (ctx.request.body.variable === 'email') {
      await ctx.orm.User.update(
        { email: ctx.request.body.email },
        { where: { id: userid } },
      );
    }
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo realizar el update del perfil') };
    ctx.status = 400;
  }
});

module.exports = router;
