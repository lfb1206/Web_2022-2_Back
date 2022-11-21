const Router = require('koa-router');

const router = new Router();

router.delete('matches.delete', '/matches/:id_match', async (ctx) => {
  try {
    const matchesUsuario = ctx.state.tokendata.matches;

    let found = false;

    matchesUsuario.forEach((match) => {
      if (match.id.toString() === ctx.params.id_match) {
        found = true;
      }
    });

    if (found) {
      await ctx.orm.Match.destroy({
        where: { id: ctx.params.id_match },
      });

      ctx.status = 204;
    } else {
      ctx.status = 401;
      ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo eliminar la partida') };
    }
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo eliminar la partida') };
    ctx.status = 400;
  }
});

module.exports = router;
