module.exports = async (ctx, next) => {
  if (!ctx.session.sessionid) {
    ctx.throw('Debes iniciar sesión', 404);
  }

  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    if (session) {
      await next();
    } else {
      ctx.throw('La sesion es invalida, inicia sesion nuevamente');
    }
  } catch (error) {
    ctx.throw(error);
  }
};
