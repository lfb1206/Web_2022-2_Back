// Tiempo turno
// async function tiempo(ctx, matchId) {
//   const match = await ctx.orm.Match.findByPk(matchId);
//   return match.tiempo_turno;
// }

// Variable global
const conversion = {
  0: {
    1: {
      0: {
        0: '0,5;0,5',
        1: '0,0;0,0',
      },
      1: {
        1: '1,5;1,5',
        2: '1,0;1,0',
      },
      2: {
        2: '2,5;2,5',
        3: '2,0;2,0',
      },
    },
  },
  1: {
    0: {
      0: {
        0: '0,5;0,5',
      },
      1: {
        0: '0,0;0,0',
        1: '1,5;1,5',
      },
      2: {
        1: '1,0;1,0',
        2: '2,5;2,5',
      },
      3: {
        2: '2,0;2,0',
      },
    },
    2: {
      0: {
        0: '0,4;0,4',
      },
      1: {
        1: '0,1;1,4',
      },
      2: {
        2: '1,1;2,4',
      },
      3: {
        3: '2,1;2,1',
      },
    },
  },
  2: {
    1: {
      0: {
        0: '0,4;0,4',
      },
      1: {
        1: '0,1;1,4',
      },
      2: {
        2: '1,1;2,4',
      },
      3: {
        2: '2,1;2,1',
      },
    },
    3: {
      0: {
        0: '3,5;3,5',
        1: '0,3;3,0',
      },
      1: {
        1: '0,2;4,5',
        2: '1,3;4,0',
      },
      2: {
        2: '1,2;5,5',
        3: '2,3;5,0',
      },
      3: {
        3: '2,2;6,5',
        4: '6,0;6,0',
      },
    },
  },
  3: {
    2: {
      0: {
        0: '3,5;3,5',
      },
      1: {
        0: '0,3;3,0',
        1: '0,2;4,5',
      },
      2: {
        1: '4,0;1,3',
        2: '1,2;5,5',
      },
      3: {
        2: '2,3;5,0',
        3: '2,2;6,5',
      },
      4: {
        3: '6,0;6,0',
      },
    },
    4: {
      0: {
        0: '3,4;3,4',
      },
      1: {
        1: '3,1;4,4',
      },
      2: {
        2: '4,1;5,4',
      },
      3: {
        3: '5,1;6,4',
      },
      4: {
        4: '6,1;6,1',
      },
    },
  },
  4: {
    3: {
      0: {
        0: '3,4;3,4',
      },
      1: {
        1: '3,1;4,4',
      },
      2: {
        2: '4,1;5,4',
      },
      3: {
        3: '5,1;6,4',
      },
      4: {
        4: '6,1;6,1',
      },
    },
    5: {
      0: {
        0: '7,5;7,5',
        1: '3,3;7,0',
      },
      1: {
        1: '3,2;8,5',
        2: '8,0;4,3',
      },
      2: {
        2: '4,2;9,5',
        3: '5,3;9,0',
      },
      3: {
        3: '10,5;5,2',
        4: '6,3;10,0',
      },
      4: {
        4: '6,2;11,5',
        5: '11,0;11,0',
      },
    },
  },
  5: {
    4: {
      0: {
        0: '7,5;7,5',
      },
      1: {
        0: '3,3;7,0',
        1: '3,2;8,5',
      },
      2: {
        1: '8,0;4,3',
        2: '4,2;9,5',
      },
      3: {
        2: '5,3;9,0',
        3: '10,5;5,2',
      },
      4: {
        3: '6,3;10,0',
        4: '6,2;11,5',
      },
      5: {
        4: '11,0;11,0',
      },
    },
    6: {
      0: {
        0: '7,4;7,4',
      },
      1: {
        1: '7,1;8,4',
      },
      2: {
        2: '8,1;9,4',
      },
      3: {
        3: '9,1;10,4',
      },
      4: {
        4: '10,1;11,4',
      },
      5: {
        5: '11,1;11,1',
      },
    },
  },
  6: {
    5: {
      0: {
        0: '7,4;7,4',
      },
      1: {
        1: '7,1;8,4',
      },
      2: {
        2: '8,1;9,4',
      },
      3: {
        3: '9,1;10,4',
      },
      4: {
        4: '10,1;11,4',
      },
      5: {
        5: '11,1;11,1',
      },
    },
    7: {
      0: {
        0: '7,3;7,3',
      },
      1: {
        0: '7,2;12,5',
        1: '8,3;12,0',
      },
      2: {
        1: '8,2;13,5',
        2: '9,3;13,0',
      },
      3: {
        2: '9,2;14,5',
        3: '10,3;14,0',
      },
      4: {
        3: '10,2;15,5',
        4: '11,3;15,0',
      },
      5: {
        4: '11,2;11,2',
      },
    },
  },
  7: {
    6: {
      0: {
        0: '7,3;7,3',
        1: '7,2;12,5',
      },
      1: {
        1: '8,3;12,0',
        2: '8,2;13,5',
      },
      2: {
        2: '9,3;13,0',
        3: '9,2;14,5',
      },
      3: {
        3: '10,3;14,0',
        4: '10,2;15,5',
      },
      4: {
        4: '11,3;15,0',
        5: '11,2;11,2',
      },
    },
    8: {
      0: {
        0: '12,4;12,4',
      },
      1: {
        1: '12,1;13,4',
      },
      2: {
        2: '13,1;14,4',
      },
      3: {
        3: '14,1;15,4',
      },
      4: {
        4: '15,1;15,4',
      },
    },
  },
  8: {
    7: {
      0: {
        0: '12,4;12,4',
      },
      1: {
        1: '12,1;13,4',
      },
      2: {
        2: '13,1;14,4',
      },
      3: {
        3: '14,1;15,4',
      },
      4: {
        4: '15,1;15,1',
      },
    },
    9: {
      0: {
        0: '12,3;12,3',
      },
      1: {
        0: '12,2;16,5',
        1: '13,3;16,0',
      },
      2: {
        1: '13,2;17,5',
        2: '14,3;17,0',
      },
      3: {
        2: '14,2;18,5',
        3: '15,3;18,0',
      },
      4: {
        3: '15,2;15,2',
      },
    },
  },
  9: {
    8: {
      0: {
        0: '12,3;12,3',
        1: '12,2;16,5',
      },
      1: {
        1: '13,3;16,0',
        2: '13,2;17,5',
      },
      2: {
        2: '14,3;17,0',
        3: '14,2;18,5',
      },
      3: {
        3: '15,3;18,0',
        4: '15,2;15,2',
      },
    },
    10: {
      0: {
        0: '16,4;16,4',
      },
      1: {
        1: '16,1;17,4',
      },
      2: {
        2: '17,1;18,4',
      },
      3: {
        3: '18,1;18,1',
      },
    },
  },
  10: {
    9: {
      0: {
        0: '16,4;16,4',
      },
      1: {
        1: '16,1;17,4',
      },
      2: {
        2: '17,1;18,4',
      },
      3: {
        3: '18,1;18,1',
      },
    },
    11: {
      0: {
        0: '16,3;16,3',
      },
      1: {
        0: '16,2;16,2',
        1: '17,3;17,3',
      },
      2: {
        1: '17,2;17,2',
        2: '18,3;18,3',
      },
      3: {
        2: '18,2;18,2',
      },
    },
  },
  11: {
    10: {
      0: {
        0: '16,3;16,3',
        1: '16,2;16,2',
      },
      1: {
        1: '17,3;17,3',
        2: '17,2;17,2',
      },
      2: {
        2: '18,3;18,3',
        3: '18,2;18,2',
      },
    },
  },
};
const { Op } = require('Sequelize');

// Información de todos los jugadores
const infojugadore = async (ctx, matchId) => {
  const players = await ctx.orm.Player.findAll({ where: { MatchId: matchId } });
  // console.log('estos son los players', players);
  const diccionario = {};
  for (const key in players) {
    const userId = players[key].dataValues.UserId;
    const user = await ctx.orm.User.findByPk(userId);
    const player = players[key].dataValues.id;

    // Aqui se crea el diccionario de materiales para todos los jugadores
    const materiales = await ctx.orm.Material.findAll({ where: { PlayerId: player } });
    // Aqui se busca la cantidad de enanos que tiene el jugador
    const enanos = await ctx.orm.Dwarf.findAll({ where: { PlayerId: player } });
    // Aqui se busca la cantidad de desarollo que tiene el jugador
    const desarollos = await ctx.orm.Development.findAll({ where: { PlayerId: player } });

    const caminos = await ctx.orm.Building.findAll({ where: { PlayerId: player, tipo: 'riel' } });

    const colorPlayer = players[key].dataValues.color;

    // Aqui se crea el diccionario de lo jugadores
    if (!(player in diccionario)) {
      diccionario[player] = {
        username: user.dataValues.username,
        color: colorPlayer,
        materiales: materiales.length,
        desarollo: desarollos.length,
        puntos: players[key].dataValues.puntos_victoria,
        enanos: enanos.length,
        cam: caminos.length,
      }; // buscar en modelos Buildings los caminos
    }
  }
  // console.log('este es el dict', diccionario);
  return diccionario;
};

// Tipo
const tablero = async (ctx, Idmatch) => {
  const hexs = await ctx.orm.Hexagone.findAll({
    attributes: ['tipo'],
    where: { MatchId: Idmatch },
  });

  const valores = [];

  hexs.forEach((hex) => {
    valores.push(hex.dataValues.tipo);
  });

  return valores;
};

// Rieles
const rieles = async (ctx, matchId) => {
  const final = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
  ];

  const players = await ctx.orm.Player.findAll({ where: { MatchId: matchId } });
  const buildings = await ctx.orm.Building.findAll({ where: { MatchId: matchId } });
  // console.log(players);
  // console.log('Llego hasta buildings');
  buildings.forEach((building) => {
    // console.log(building);
    const category = building.dataValues.tipo;
    if (category === 'riel') {
      players.forEach((player) => {
        if (player.dataValues.id === building.dataValues.PlayerId) {
          const {
          // eslint-disable-next-line camelcase
            posicion_x, posicion_y, posicion_x2, posicion_y2,
          } = building.dataValues;
          // eslint-disable-next-line camelcase
          const coordenadas = conversion[posicion_x][posicion_x2][posicion_y][posicion_y2].split(';');
          const colorPlayer = player.dataValues.color;
          coordenadas.forEach((coordenada) => {
            final[coordenada.split(',')[0]][coordenada.split(',')[1]] = colorPlayer;
          });
        }
      });
    }
  });
  // console.log(hardcodeado)

  return final;
};

// Hexagonos
const hexagonos = async (ctx, matchId) => {
  const hexs = await ctx.orm.Hexagone.findAll({ where: { MatchId: matchId } });
  const numerosDic = {};
  hexs.forEach((hex) => {
    if (hex.dataValues.smuggling) {
      numerosDic[hex.dataValues.posicion_x] = 'saqueador';
    } else {
      numerosDic[hex.dataValues.posicion_x] = hex.dataValues.numero;
    }
  });
  const builds = await ctx.orm.Building.findAll({ where: { MatchId: matchId } });
  const players = await ctx.orm.Player.findAll({ where: { MatchId: matchId } });
  const buildings = [[
    ['', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', ''],
  ]];
  builds.forEach((build) => {
    if (build.dataValues.tipo !== 'riel') {
      const { tipo } = build.dataValues;
      buildings[1][build.dataValues.posicion_x][build.dataValues.posicion_y] = tipo;
      players.forEach((player) => {
        if (build.dataValues.PlayerId === player.dataValues.id) {
          const { color } = player.dataValues;
          buildings[0][build.dataValues.posicion_x][build.dataValues.posicion_y] = color;
        }
      });
    }
  });
  const enanos = await ctx.orm.Dwarf.findAll({ where: { MatchId: matchId } });
  enanos.forEach((enano) => {
    buildings[1][enano.dataValues.posicion_x][enano.dataValues.posicion_y] = 'enano';
    players.forEach((player) => {
      if (enano.dataValues.PlayerId === player.dataValues.id) {
        const { color } = player.dataValues;
        buildings[0][enano.dataValues.posicion_x][enano.dataValues.posicion_y] = color;
      }
    });
  });
  const hardcodeado = {
    numeros: numerosDic,
    objetos: buildings,
  };
  return hardcodeado;
};

// Materiales
const materiales = async (ctx, matchId, playerId) => {
  const materials = await ctx.orm.Material.findAll({ where: { PlayerId: playerId } });
  const diccionario = {
    coal: 0,
    gold: 0,
    copper: 0,
    wood: 0,
    rock: 0,
    ruby: 0,
    diamond: 0,
    iron: 0,
    development: 0,
  };
  for (const key in materials) {
    const materia = materials[key].dataValues.materia_prima;
    diccionario[materia] += 1;
  }
  return diccionario;
};

// Saqueadores
const saqueadores = async (ctx, matchId) => {
  const industrias = await ctx.orm.Building.findAll({
    where: { tipo: 'industria', MatchId: matchId },
  });
  const saqueador = await ctx.orm.Looter.findByPk(matchId);

  const eNivel1 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 1, estado: true },

  });
  const eNivel2 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 2, estado: true },

  });
  const eNivel3 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 3, estado: true },

  });

  const fuerzaDefensa = eNivel1.length + (eNivel2.length * 2) + (eNivel3.length * 3);
  return {
    fuerza: industrias.length * 2,
    defensa: fuerzaDefensa,
    turnos_ataque: saqueador.dataValues.avance,
  };
};

// CurrentPlayer
const current = async (ctx, matchId) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const user = session.userId;
    const player = await ctx.orm.Player.findOne({
      where: {
        UserId: user,
        MatchId: ctx.request.params.matchId,
      },
    });
    return player;
  } catch (err) {
    console.log(err);
    return 'false';
  }
};

// Ganador del match
const nombreGanador = async (ctx, matchId) => {
  const nombre = await ctx.orm.Match.findOne({
    attributes: ['jugador_ganador'],
    where: { id: matchId },
  });
  return nombre;
};

// Perder cartas
const perderCartas = async (ctx, matchId) => {
  console.log('Se entra en la función');

  const players = await ctx.orm.Player.findAll({ where: { MatchId: matchId } });
  for (const key in players) {
    const materialesPlayer = [];
    const materials = await ctx.orm.Material.findAll({
      where: { PlayerId: players[key].dataValues.id },
    });
    for (const key2 in materials) {
      materialesPlayer.push(materials[key2].dataValues);
    }

    if (materials.length > 7) {
      const cantidadEliminar = Math.floor((materialesPlayer.length / 2));
      // Se eligen la mitad menor de cartas ala azar para eliminar
      const shuffled = [...materialesPlayer].sort(() => 0.5 - Math.random());
      const eliminar = shuffled.slice(0, cantidadEliminar);
      // Se eliminar las cartas en lista Eliminarr
      for (const elemento in eliminar) {
        const elimino = await ctx.orm.Material.findOne({
          where: {
            PlayerId: players[key].dataValues.id, materia_prima: eliminar[elemento].materia_prima,
          },
        });
        await ctx.orm.Material.destroy({
          where: {
            PlayerId: players[key].dataValues.id,
            id: eliminar[elemento].id,
          },
        });
      }
    }
  }
};

// Ataque de los looters a Amberes
const defensa = async (ctx, matchId) => {
  // Se obtienen lus puntos de pelea
  const minas = await ctx.orm.Building.findAll({
    where: { tipo: 'industria', MatchId: matchId },
  });
  const industrias = await ctx.orm.Building.findAll({
    where: { tipo: 'industria', MatchId: matchId },
  });
  const jugadores = await ctx.orm.Player.findAll({
    where: { MatchId: matchId },
  });

  const eNivel1 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 1, estado: true },
  });
  const eNivel2 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 2, estado: true },
  });
  const eNivel3 = await ctx.orm.Dwarf.findAll({
    where: { MatchId: matchId, nivel: 3, estado: true },
  });

  const fuerzaDefensa = eNivel1.length + (eNivel2.length * 2) + (eNivel3.length * 3);
  const fuerzaAtaque = minas.length + industrias.length;

  // Se ve quien gana y se realizan los cambios
  if (fuerzaDefensa > fuerzaAtaque) {
    jugadores.forEach(async (jugador) => {
      const valor = jugador.puntos_victoria;
      await ctx.orm.Player.update(
        { puntos_victoria: valor + 1 },
        { where: { id: jugador.id } },
      );
      // Se desactivan los enanos
      await ctx.orm.Dwarf.update(
        { estado: false },
        { where: { PlayerId: jugador.id } },
      );
    });
  } else if (fuerzaDefensa < fuerzaAtaque) {
    jugadores.forEach(async (jugador) => {
      // Se eliminar los enanos
      await ctx.orm.Dwarf.destroy(
        { where: { PlayerId: jugador.id } },
      );
    });
  }
};

const ocupadosBuildings = async (ctx, matchId) => {
  const posicionesOcupadas = [];
  const buildings = await ctx.orm.Building.findAll({ where: { MatchId: matchId } });
  for (const building in buildings) {
    if (!(buildings[building].dataValues.tipo === 'riel')) {
      // eslint-disable-next-line camelcase
      const { posicion_x, posicion_y } = buildings[building].dataValues;
      // eslint-disable-next-line camelcase
      const posiciones = [posicion_x, posicion_y];
      posicionesOcupadas.push(posiciones);
    }
  }
  return posicionesOcupadas;
};

const ocupadosRieles = async (ctx, matchId) => {
  const posicionesOcupadas = [];
  const buildings = await ctx.orm.Building.findAll({ where: { MatchId: matchId } });
  for (const building in buildings) {
    if (buildings[building].dataValues.tipo === 'riel') {
      const {
        // eslint-disable-next-line camelcase
        posicion_x, posicion_y, posicion_x2, posicion_y2,
      } = buildings[building].dataValues;
      // eslint-disable-next-line camelcase
      const posiciones = [[posicion_x, posicion_y], [posicion_x2, posicion_y2]];
      posicionesOcupadas.push(posiciones);
    }
  }
  return posicionesOcupadas;
};

const ocupadosEnanos = async (ctx, matchId) => {
  const posicionesOcupadas = [];
  const players = await ctx.orm.Player.findAll({ where: { MatchId: matchId } });
  for (const player in players) {
    const enanos = await ctx.orm.Dwarf.findAll({
      where: {
        PlayerId: players[player].dataValues.id,
      },
    });
    for (const enano in enanos) {
      const posiciones = [enanos[enano].dataValues.posicion_x, enanos[enano].dataValues.posicion_y];
      posicionesOcupadas.push(posiciones);
    }
    console.log(posicionesOcupadas);
  }
  return posicionesOcupadas;
};

const ocupadosminas = async (ctx, matchId) => {
  const posicionesOcupadas = [];
  const buildings = await ctx.orm.Building.findAll({ where: { MatchId: matchId } });
  for (const building in buildings) {
    if (buildings[building].dataValues.tipo === 'mina') {
      // eslint-disable-next-line camelcase
      const { posicion_x, posicion_y } = buildings[building].dataValues;
      // eslint-disable-next-line camelcase
      const posiciones = [posicion_x, posicion_y];
      posicionesOcupadas.push(posiciones);
    }
  }
  return posicionesOcupadas;
};

// Verificar si se puede ubicar
const verificarLugar = async (ctx, matchId, tipo, posx, posy, posx2, posy2) => {
  const lugaresBuildings = await ocupadosBuildings(ctx, matchId);
  const lugaresRieles = await ocupadosRieles(ctx, matchId);
  const lugaresEnanos = await ocupadosEnanos(ctx, matchId);
  const lugaresminas = await ocupadosminas(ctx, matchId);

  // Verificar 'acunadura'

  if (tipo === 'acuñadura') {
    console.log('Entro a acunadura');
    const buildings = await ctx.orm.Building.findAll({ where: { MatchId: matchId, PlayerId: 0 } });
    for (const building in buildings) {
      if (buildings[building].dataValues.tipo === 'industria') {
        const {
          // eslint-disable-next-line camelcase
          posicion_x, posicion_y,
        } = buildings[building].dataValues;
          // eslint-disable-next-line camelcase
        const posicionindustria = [posicion_x, posicion_y];
        if (JSON.stringify(posicionindustria).includes(JSON.stringify([posx, posy]))) {
          console.log('Se puede poner acunadura, ya que existe una industria aqui');
          return true;
        }
        console.log('No existe una industria aqui');
        return false;
      }
    }
  // Verificar mina
  } else if (tipo === 'mina') {
    console.log('Entro a mina');
    // Verificar que no exista un mina en esa posicion
    if (JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx, posy]))) {
      console.log('NO se puede construir aqui');
      return false;
    }
    if (posx > 5) {
      // Verifica si PosX es par o impar
      if (posx % 2 === 1) {
        // Si es impar, se verifica que sus puntos adjacentes esten vacios
        const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify(
          [posx - 1, posy - 1],
        ));
        const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
        const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
        if (cond1 || cond2 || cond3) {
          console.log('NO PUEDES PONER UNA MINA AQUI, ESTA MUY CERCA DE OTRO');
          return false;
          // Verificar que la mina este conectada a un camino
        }
        if (JSON.stringify(lugaresRieles).includes(JSON.stringify([posx, posy]))) {
          console.log('Este mina esta en un camino');
          return true;
        }
        console.log('No hay ningun camino para poner el mina');
        return false;
      }
      // Si es par, se verifica que sus puntos adjacentes esten vacios
      const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy + 1]));
      const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
      const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
      if (cond1 || cond2 || cond3) {
        console.log('NO PUEDES PONER UN MINA AQUI, ESTA MUY CERCA DE OTRO');
        return false;
        // Verificar que el mina este conectada a un camino
      }
      if (JSON.stringify(lugaresRieles).includes(JSON.stringify([posx, posy]))) {
        console.log('Este mina esta en un camino');
        return true;
      }
      console.log('No hay ningun camino para poner el mina');
      return false;
    }
    if (posx % 2 === 1) {
      // Si es impar, se verifica que sus puntos adjacentes esten vacios
      const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy - 1]));
      const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
      const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
      if (cond1 || cond2 || cond3) {
        console.log('NO PUEDES PONER UNA MINA AQUI, ESTA MUY CERCA DE OTRO');
        return false;
        // Verificar que la mina este conectada a un camino
      }
      if (JSON.stringify(lugaresRieles).includes(JSON.stringify([posx, posy]))) {
        console.log('Este mina esta en un camino');
        return true;
      }
      console.log('No hay ningun camino para poner el mina');
      return false;
    }
    // Si es par, se verifica que sus puntos adjacentes esten vacios
    const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy - 1]));
    const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
    const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
    if (cond1 || cond2 || cond3) {
      console.log('NO PUEDES PONER UN MINA AQUI, ESTA MUY CERCA DE OTRO');
      return false;
      // Verificar que el mina este conectada a un camino
    }
    if (JSON.stringify(lugaresRieles).includes(JSON.stringify([posx, posy]))) {
      console.log('Este mina esta en un camino');
      return true;
    }
    console.log('No hay ningun camino para poner el mina');
    return false;
  } else if (tipo === 'industria') {
    console.log('Entro a industria');
    // Verificar si existe un mina en las coordenadas PosX y PosY
    if (JSON.stringify(lugaresminas).includes(JSON.stringify([posx, posy]))) {
      console.log('Se puede poner una industria aqui');
      return true;
    }
    console.log('No se puede poner una industria aqui, porque no hay mina');
    return false;
  // Verificar riel
  } else if (tipo === 'riel') {
    console.log('Entro a riel');
    try {
      const coordenadas = conversion[posx][posx2][posy][posy2];
      if (coordenadas) {
        let cont = 0;
        console.log('riel');
        console.log(lugaresRieles);
        // Verificar que no exista un riel en esas coordenadas
        const cond1 = JSON.stringify(lugaresRieles).includes(JSON.stringify(
          [[posx, posy], [posx2, posy2]],
        ));
        const cond2 = JSON.stringify(lugaresRieles).includes(JSON.stringify(
          [[posx2, posy2], [posx, posy]],
        ));
        if (cond1 || cond2) {
          console.log('Este riel ya existe');
        } else {
          console.log('Este riel no existe');
          for (const j in lugaresRieles) {
            for (const i in lugaresRieles[j]) {
              // Verificar si existe un camino en alguno de los vertices del que queremos crear
              const cond1 = JSON.stringify(lugaresRieles[j][i]) === JSON.stringify([posx, posy]);
              const cond2 = JSON.stringify(lugaresRieles[j][i]) === JSON.stringify([posx2, posy2]);
              if (cond1 || cond2) {
                console.log('Existe un camino que los conecte');
                return true;
              }
              console.log('No existe un camino que los conecte');
              cont += 1;
            }
          }
          console.log(cont);
          if (cont === (lugaresRieles.length) * 2) {
            const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx, posy]));
            const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx2, posy2]));
            if (cond1 || cond2) {
              console.log('El riel se encuentra pegado a una industria o mina');
              return true;
            }
            console.log('El riel no se encuentra conectado a nada');
            return false;
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log('Lugar no aceptado');
      return false;
    }
  // Verificar enano
  }
  console.log('Entro a dwarfs');
  // Verificar que no haya un enano en esa poscion
  const cond1 = JSON.stringify(lugaresRieles).includes([posx, posy]);
  const cond2 = JSON.stringify(lugaresBuildings).includes([posx, posy]);
  if (JSON.stringify(lugaresEnanos).includes([posx, posy])) {
    console.log('Hay un enano en esta posicion');
    return false;
  }
  if (cond1) {
    if (!(cond2)) {
      console.log('Si se puede poner un enano aqui');
      return true;
    }
  }
  console.log('No se puede poner aqui');
  return false;
};

// Verifica si se puede pagar
const verificarPago = async (ctx, matchId, tipo) => {
  const costos = {
    riel: ['wood', 'rock'],
    mina: ['wood', 'gold'],
    industria: ['copper', 'copper', 'coal', 'coal', 'gold'],
    acuñadura: ['rock', 'rock'],
    enano: ['coal', 'gold', 'copper'],
  };
  const match = await ctx.orm.Match.findByPk(matchId);
  const currentplayer = await current(ctx, ctx.request.params.matchId);
  const materials = await ctx.orm.Material.findAll({ where: { PlayerId: currentplayer.id } });
  const listaMateriales = [];
  for (const key in materials) {
    listaMateriales.push(materials[key].dataValues.materia_prima);
  }
  const countObj = {};
  const countFunc = (keys) => {
    countObj[keys] = (countObj[keys] + 1) || 1;
  };
  listaMateriales.forEach((matr) => {
    countFunc(matr);
  });
  const comprar = costos[tipo];
  const countCompra = {};
  const countCompraFunc = (keys) => {
    countCompra[keys] = (countCompra[keys] + 1) || 1;
  };
  comprar.forEach((comp) => {
    countCompraFunc(comp);
  });
  let valor = true;
  for (const key in countCompra) {
    if (key in countObj) {
      if (!(countObj[key] >= countCompra[key])) {
        valor = false;
      }
    } else {
      valor = false;
    }
  }
  return valor;
};

// Realizar descuento en la bdd
const realizarPago = async (ctx, matchId, tipo) => {
  const costos = {
    riel: ['wood', 'rock'],
    mina: ['wood', 'gold'],
    industria: ['copper', 'copper', 'coal', 'coal', 'gold'],
    acuñadura: ['rock', 'rock'],
    enano: ['coal', 'gold', 'copper'],
  };

  const match = await ctx.orm.Match.findByPk(matchId);
  const currentPlayer = await current(ctx, ctx.request.params.matchId);
  const compra = costos[tipo];
  for (const value in compra) {
    const Materia = await ctx.orm.Material.findOne({
      where: {
        materia_prima: compra[value],
        PlayerId: currentPlayer.id,
      },
    });

    await ctx.orm.Material.destroy({
      where: {
        id: Materia.id,
      },
    });
  }
  return false;
};

// Se verifica si es que se esta atacando a otro enano
const verificarAtaque = async (ctx, matchId, posx, posy) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const player = await ctx.orm.Player.findOne({
    where: { UserId: user, MatchId: ctx.request.params.matchId },
  });
  let devolver = false;
  const existeEnano = await ctx.orm.Dwarf.findOne({
    where: {
      posicion_x: posx,
      posicion_y: posy,
      MatchId: matchId,
      PlayerId: { [Op.ne]: player.id },
    },
  });
  if (existeEnano) {
    devolver = true;
  }
  return devolver;
};

// Realizar el ataque
const realizarAtaque = async (ctx, matchId, posxOriginal, posyOriginal, posxMover, posyMover) => {
  const enanoAtacante = await ctx.orm.Dwarf.findOne({
    where: {
      posicion_x: posxOriginal,
      posicion_y: posyOriginal,
      MatchId: matchId,
    },
  });
  const enanoAtacado = await ctx.orm.Dwarf.findOne({
    where: {
      posicion_x: posxMover,
      posicion_y: posyMover,
      MatchId: matchId,
    },
  });

  // Guardo los resultados
  const resultadosDados1 = [];
  const resultadosDados2 = [];

  // Lanzo los dados
  for (let step = 0; step < enanoAtacante.nivel; step += 1) {
    const randomNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    resultadosDados1.push(randomNum);
  }

  for (let step = 0; step < enanoAtacado.nivel; step += 1) {
    const randomNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    resultadosDados2.push(randomNum);
  }
  // Se ordenan las listas
  const ordenados1 = resultadosDados1.sort();
  const ordenados2 = resultadosDados2.sort();

  // Se obtiene el dado de mayor valor
  let ganoAtacante = false;
  const dadoAtacante = ordenados1[ordenados1.length - 1];
  const dadoAtacado = ordenados2[ordenados2.length - 1];

  // Comparo el máximo dado de cada uno (El que pierde, pierde a su enano)
  if (dadoAtacante > dadoAtacado) {
    ganoAtacante = true;
    await ctx.orm.Dwarf.destroy({ where: { id: enanoAtacado.id } });
  } else {
    await ctx.orm.Dwarf.destroy({ where: { id: enanoAtacante.id } });
  }

  return ganoAtacante;
};

// Explicita si es que el jugador le toca o no jugar
const tocaJugar = async (ctx, matchId, player) => {
  let devolver = false;
  try {
    const match = await ctx.orm.Match.findOne({ where: { id: matchId } });
    if (player.numero_jugador === match.current_player) {
      devolver = true;
    }
  } catch (err) {
    console.log(err);
  }
  return devolver;
};

// Agregar verificaciones con conversion, a través de un try catch
const verificarInicio = async (ctx, matchId, tipo, posx, posy, posx2, posy2) => {
  const lugaresBuildings = await ocupadosBuildings(ctx, matchId);
  const lugaresRieles = await ocupadosRieles(ctx, matchId);
  let valor = true;
  // Verificar mina
  if (tipo === 'mina') {
    // Verificar que no exista un mina en esa posicion
    if (JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx, posy]))) {
      console.log('NO se puede construir aqui');
      valor = false;
    }
    if (posx > 5) {
      // Verifica si PosX es par o impar
      if (posx % 2 === 1) {
        // Si es impar, se verifica que sus puntos adjacentes esten vacios
        const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify(
          [posx - 1, posy - 1],
        ));
        const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
        const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
        if (cond1 || cond2 || cond3) {
          console.log('NO PUEDES PONER UNA MINA AQUI, ESTA MUY CERCA DE OTRO');
          valor = false;
          // Verificar que la mina este conectada a un camino
        }
      }
      // Si es par, se verifica que sus puntos adjacentes esten vacios
      const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy + 1]));
      const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
      const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
      if (cond1 || cond2 || cond3) {
        console.log('NO PUEDES PONER UN MINA AQUI, ESTA MUY CERCA DE OTRO');
        valor = false;
      }
    }
    if (posx % 2 === 1) {
      // Si es impar, se verifica que sus puntos adjacentes esten vacios
      const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy - 1]));
      const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
      const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
      if (cond1 || cond2 || cond3) {
        console.log('NO PUEDES PONER UNA MINA AQUI, ESTA MUY CERCA DE OTRO');
        valor = false;
        // Verificar que la mina este conectada a un camino
      }
    }
    // Si es par, se verifica que sus puntos adjacentes esten vacios
    const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy - 1]));
    const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx - 1, posy]));
    const cond3 = JSON.stringify(lugaresBuildings).includes(JSON.stringify([posx + 1, posy]));
    if (cond1 || cond2 || cond3) {
      console.log('NO PUEDES PONER UN MINA AQUI, ESTA MUY CERCA DE OTRO');
      valor = false;
    }
  // Verificar riel
  } else if (tipo === 'riel') {
    try {
      const coordenadas = conversion[posx][posx2][posy][posy2];

      if (coordenadas) {
        console.log('riel');
        console.log(lugaresRieles);
        // Verificar que no exista un riel en esas coordenadas
        const cond1 = JSON.stringify(lugaresRieles).includes(JSON.stringify(
          [[posx, posy], [posx2, posy2]],
        ));
        const cond2 = JSON.stringify(lugaresRieles).includes(JSON.stringify(
          [[posx2, posy2], [posx, posy]],
        ));
        if (cond1 || cond2) {
          console.log('Este riel ya existe');
          valor = false;
        } else {
          console.log('Este riel no existe');
          valor = false;
          const cond1 = JSON.stringify(lugaresBuildings).includes(JSON.stringify(
            [posx, posy],
          ));
          const cond2 = JSON.stringify(lugaresBuildings).includes(JSON.stringify(
            [posx2, posy2],
          ));
          console.log([posx, posy]);
          console.log([posx2, posy2]);
          console.log(JSON.stringify(lugaresBuildings));
          console.log(cond1, cond2);
          if (cond1 || cond2) {
            console.log('El riel se encuentra pegado a una o mina');
            valor = true;
          }
          console.log('El riel no se encuentra conectado a nada');
        }
      } else {
        valor = false;
      }
    } catch (error) {
      console.log('Lugar no posible');
      valor = false;
    }
  }
  return valor;
};

const funciones = {
  infojugadore,
  tablero,
  rieles,
  hexagonos,
  materiales,
  saqueadores,
  current,
  nombreGanador,
  perderCartas,
  defensa,
  ocupadosBuildings,
  ocupadosRieles,
  ocupadosEnanos,
  ocupadosminas,
  verificarLugar,
  verificarPago,
  realizarPago,
  verificarAtaque,
  realizarAtaque,
  tocaJugar,
  verificarInicio,
};

module.exports = funciones;
