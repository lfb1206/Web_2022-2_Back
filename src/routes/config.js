const Router = require('koa-router');

const router = new Router();

// Crear una nueva partida
router.post('/', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;

  // Algunos datos necesarios para la creción
  ctx.request.body.iniciada = false;
  ctx.request.body.conectados = 1;
  ctx.request.body.current_player = 1;
  ctx.request.body.usuario_creador = user;
  ctx.request.body.jugador_ganador = 'false';

  // console.log('request body:', ctx.request.body);
  const colores = {
    1: 'Rojo',
    2: 'Verde',
    3: 'Azul',
    4: 'Amarillo',
  };

  // Para crear el tipo de los hexagonos al azar
  const tiposOrdenados = ['coal', 'wood', 'iron', 'coal', 'iron', 'copper',
    'rock', 'rock', 'rock', 'wood', 'coal', 'copper',
    'iron', 'coal', 'wood', 'rock', 'wood', 'copper'];

  function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
    return inputArray;
  }

  const tipos = shuffleArray(tiposOrdenados);
  console.log('Desordenado:', tipos);

  try {
    const match = await ctx.orm.Match.create(ctx.request.body);
    await ctx.orm.Looter.create({
      avance: 0,
      MatchId: match.dataValues.id,
    });
    await ctx.orm.Smuggling.create({
      posicion_x: 10,
      posicion_y: 10,
      hexagone: 9,
      MatchId: match.dataValues.id,
    });
    const player = await ctx.orm.Player.create({
      color: colores[1],
      puntos_victoria: 0,
      numero_jugador: 1,
      UserId: user,
      MatchId: match.dataValues.id,
    });

    // Creación de hexagonos
    const hexagone = await ctx.orm.Hexagone.create({
      numero: 2,
      posicion_x: 1,
      posicion_y: 1,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[0],
    });
    const hexagone2 = await ctx.orm.Hexagone.create({
      numero: 10,
      posicion_x: 2,
      posicion_y: 2,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[1],
    });
    const hexagone3 = await ctx.orm.Hexagone.create({
      numero: 4,
      posicion_x: 3,
      posicion_y: 3,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[2],
    });
    const hexagone4 = await ctx.orm.Hexagone.create({
      numero: 3,
      posicion_x: 4,
      posicion_y: 4,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[3],
    });
    const hexagone5 = await ctx.orm.Hexagone.create({
      numero: 11,
      posicion_x: 5,
      posicion_y: 5,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[4],
    });
    const hexagone6 = await ctx.orm.Hexagone.create({
      numero: 8,
      posicion_x: 6,
      posicion_y: 6,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[5],
    });
    const hexagone7 = await ctx.orm.Hexagone.create({
      numero: 5,
      posicion_x: 7,
      posicion_y: 7,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[6],
    });
    const hexagone8 = await ctx.orm.Hexagone.create({
      numero: 6,
      posicion_x: 8,
      posicion_y: 8,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[7],
    });
    const hexagone9 = await ctx.orm.Hexagone.create({
      numero: 9,
      posicion_x: 9,
      posicion_y: 9,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[8],
    });
    const hexagone10 = await ctx.orm.Hexagone.create({
      numero: 0,
      posicion_x: 10,
      posicion_y: 10,
      smuggling: true,
      MatchId: match.dataValues.id,
      tipo: 'artic',
    });
    const hexagone11 = await ctx.orm.Hexagone.create({
      numero: 12,
      posicion_x: 11,
      posicion_y: 11,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[9],
    });
    const hexagone12 = await ctx.orm.Hexagone.create({
      numero: 3,
      posicion_x: 12,
      posicion_y: 12,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[10],
    });
    const hexagone13 = await ctx.orm.Hexagone.create({
      numero: 8,
      posicion_x: 13,
      posicion_y: 13,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[11],
    });
    const hexagone14 = await ctx.orm.Hexagone.create({
      numero: 4,
      posicion_x: 14,
      posicion_y: 14,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[12],
    });
    const hexagone15 = await ctx.orm.Hexagone.create({
      numero: 5,
      posicion_x: 15,
      posicion_y: 15,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[13],
    });
    const hexagone16 = await ctx.orm.Hexagone.create({
      numero: 6,
      posicion_x: 16,
      posicion_y: 16,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[14],
    });
    const hexagone17 = await ctx.orm.Hexagone.create({
      numero: 9,
      posicion_x: 17,
      posicion_y: 17,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[15],
    });
    const hexagone18 = await ctx.orm.Hexagone.create({
      numero: 10,
      posicion_x: 18,
      posicion_y: 18,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[16],
    });
    const hexagone19 = await ctx.orm.Hexagone.create({
      numero: 11,
      posicion_x: 19,
      posicion_y: 19,
      smuggling: false,
      MatchId: match.dataValues.id,
      tipo: tipos[17],
    });

    ctx.body = match.dataValues.id;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo crear la partida') };
    ctx.status = 400;
  }
});

module.exports = router;
