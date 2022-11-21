const Router = require('koa-router');

const router = new Router();

// Mostrar las partidas
router.get('partidas.show', '/show', async (ctx) => {
  try {
    const infoPartidas = await ctx.orm.Match.findAll();
    ctx.body = infoPartidas;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo obtener las partidas') };
    ctx.status = 400;
  }
});

// Verificar union partida (Agregar respuestas)
// eslint-disable-next-line consistent-return
router.post('/unir', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const userid = session.dataValues.userId;

  //  Diccionario de asociaciones entre numeros y colores
  const colores = {
    1: 'Rojo',
    2: 'Verde',
    3: 'Azul',
    4: 'Amarillo',
  };

  //  Busco si el jugador ya esta conectado
  const jugador = await ctx.orm.Player.findOne({
    where: {
      MatchId: ctx.request.body.matchId,
      UserId: userid,
    },
  });
  console.log(jugador);

  // Busco si existe la partida
  const match = await ctx.orm.Match.findByPk(ctx.request.body.matchId);

  //  Si es que no existe se une
  try {
    if ((!jugador) && (match.dataValues.conectados < match.dataValues.cantidad_jugadores)) {
      try {
        await ctx.orm.Player.create({
          color: (colores[match.dataValues.conectados + 1]),
          puntos_victoria: 0,
          numero_jugador: (match.dataValues.conectados + 1),
          UserId: userid,
          MatchId: ctx.request.body.matchId,
        });

        await ctx.orm.Match.update(
          { conectados: match.dataValues.conectados + 1 },
          { where: { id: ctx.request.body.matchId } },
        );
        ctx.status = 200;
        ctx.body = { detail: JSON.stringify('Se ha unido con exito') };
      } catch (err) {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify(err.message) };
      }
    } else if (jugador !== null) {
      ctx.status = 200;
      ctx.body = { detail: JSON.stringify('Se ha unido con exito') };
    } else if (!match) {
      ctx.status = 404;
      ctx.body = { detail: JSON.stringify('No se encontro el match') };
    } else if (match.dataValues.conectados === match.dataValues.cantidad_jugadores) {
      ctx.status = 403;
      ctx.body = { detail: JSON.stringify('No se encontro el match') };
    }
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo unir a la partida') };
    ctx.status = 400;
  }
});

// Mostrar las partidas propias
router.get('partidas.show', '/own', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const userid = session.userId;
    const infoPartidas = await ctx.orm.Match.findAll({ where: { usuario_creador: userid } });
    ctx.body = infoPartidas;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudieron obtener las partidas') };
    ctx.status = 400;
  }
});

module.exports = router;
