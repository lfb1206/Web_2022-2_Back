const Router = require('koa-router');
const { Op } = require('Sequelize');

const router = new Router();

const funciones = require('./utiles/funciones');

const {
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
  ocupadosPozos,
  verificarLugar,
  verificarPago,
  realizarPago,
  verificarAtaque,
  realizarAtaque,
  tocaJugar,
  verificarInicio,
} = funciones;

// Lanzamiento de dados
router.post('/:matchId/play', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
  const player = await ctx.orm.Player.findOne({
    where: {
      UserId: user,
      MatchId: ctx.request.params.matchId,
    },
  });
  const jug = player.numero_jugador;
  if (match.current_player === jug) {
    // Informacion que llega
    const sumadados = await ctx.request.body.dados;
    const avanceLooter = await ctx.request.body.evento;

    // Actualizar valor del looter
    const looter = await ctx.orm.Looter.findAll({
      where: { MatchId: ctx.request.params.matchId },
    });

    let valor = 6;
    if (looter[0].avance > 0) {
      valor = looter[0].avance - 1;
    } else {
      valor = 6;
      // Se realiza el ataque a la ciudad
      await defensa(ctx, ctx.request.params.matchId);
    }

    if (avanceLooter) {
      await ctx.orm.Looter.update(
        { avance: valor },
        { where: { MatchId: ctx.request.params.matchId } },
      );
    }

    // Cada vez que aparece el 7 se verifica la cantidad de cartas
    if (sumadados.toString() === (7).toString()) {
      await perderCartas(ctx, ctx.request.params.matchId);
    } else {
      // Actualizar los materiales ganados
      // console.log('Comenzando hexagonos');
      const hexes = await ctx.orm.Hexagone.findAll({
        where: {
          MatchId: ctx.request.params.matchId,
          numero: sumadados,
        },
      });

      const relacionHexagonos = {
        1: [[0, 0], [1, 1], [2, 1], [3, 1], [2, 0], [1, 0]],
        2: [[0, 1], [1, 2], [2, 2], [3, 2], [2, 1], [1, 1]],
        3: [[0, 2], [1, 3], [2, 3], [3, 3], [2, 2], [1, 2]],
        4: [[2, 0], [3, 1], [4, 1], [5, 1], [4, 0], [3, 0]],
        5: [[2, 1], [3, 2], [4, 2], [5, 2], [4, 1], [3, 1]],
        6: [[2, 2], [3, 3], [4, 3], [5, 3], [4, 2], [3, 2]],
        7: [[2, 3], [3, 4], [4, 4], [5, 4], [4, 3], [3, 3]],
        8: [[4, 0], [5, 1], [6, 1], [7, 0], [6, 0], [5, 0]],
        9: [[4, 1], [5, 2], [6, 2], [7, 1], [6, 1], [5, 1]],
        10: [[4, 2], [5, 3], [6, 3], [7, 2], [6, 2], [5, 2]],
        11: [[4, 3], [5, 4], [6, 4], [7, 3], [6, 3], [5, 3]],
        12: [[4, 4], [5, 5], [6, 5], [7, 4], [6, 4], [5, 4]],
        13: [[6, 1], [7, 1], [8, 1], [9, 0], [8, 0], [7, 0]],
        14: [[6, 2], [7, 2], [8, 2], [9, 1], [8, 1], [7, 1]],
        15: [[6, 3], [7, 3], [8, 3], [9, 2], [8, 2], [7, 2]],
        16: [[6, 4], [7, 4], [8, 4], [9, 3], [8, 3], [7, 3]],
        17: [[8, 1], [9, 1], [10, 1], [11, 0], [10, 0], [9, 0]],
        18: [[8, 2], [9, 2], [10, 2], [11, 1], [10, 1], [9, 1]],
        19: [[8, 3], [9, 3], [10, 3], [11, 2], [10, 2], [9, 2]],
      };

      try {
        await hexes.forEach(async (hexe) => {
          const num = hexe.posicion_x;
          const materiaPrima = hexe.tipo;
          await relacionHexagonos[num].forEach(async (posicion) => {
            const build = await ctx.orm.Building.findOne({
              where: {
                MatchId: ctx.request.params.matchId,
                tipo: { [Op.ne]: 'riel' },
                posicion_x: posicion[0],
                posicion_y: posicion[1],
              },
            });
            if (build) {
              if (build.tipo === 'mina') {
                const Playerid = build.PlayerId;

                await ctx.orm.Material.create({
                  materia_prima: materiaPrima,
                  PlayerId: Playerid,
                });
              } else {
                const Playerid = build.PlayerId;

                await ctx.orm.Material.create({
                  materia_prima: materiaPrima,
                  PlayerId: Playerid,
                });
                await ctx.orm.Material.create({
                  materia_prima: materiaPrima,
                  PlayerId: Playerid,
                });
              }
            }
          });
        });
      } catch (error) {
        ctx.throw(error);
        ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo obtener las materias primas') };
        ctx.status = 400;
      }
    }
    // console.log(await ctx.orm.Material.count())
    ctx.status = 200;
  } else {
    ctx.body = { detail: JSON.stringify('No es tu turno') };
    ctx.status = 403;
  }
});

// Terminar turno
router.get('/:matchId/endTurn', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const user = session.userId;
    const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
    const player = await ctx.orm.Player.findOne({
      where: {
        UserId: user,
        MatchId: ctx.request.params.matchId,
      },
    });
    let jug = player.numero_jugador;
    if (match.current_player === jug) {
      // Cambio al jugador en turno
      if (player.numero_jugador < match.cantidad_jugadores) {
        jug += 1;
      } else {
        jug = 1;
      }

      const idNuevoJugador = await ctx.orm.Player.findOne({
        where: {
          MatchId: ctx.request.params.matchId,
          numero_jugador: jug,
        },
      });

      // Verifico si es que algun jugador gano
      const jugadores = await ctx.orm.Player.findAll({
        where: {
          MatchId: ctx.request.params.matchId,
        },
      });

      // Cambia el current player
      await ctx.orm.Match.update(
        { current_player: jug },
        { where: { id: ctx.request.params.matchId } },
      );

      // Verifico si es que alguien gana
      let valor = match.jugador_ganador;

      await jugadores.forEach(async (jugador) => {
        if ((jugador.puntos_victoria >= match.puntos_victoria) && (valor === 'false')) {
          const userGanador = await ctx.orm.User.findOne({
            where: { id: jugador.UserId },
          });
          valor = userGanador.username;

          await ctx.orm.Match.update(
            { jugador_ganador: valor.toString(), current_player: false },
            { where: { id: ctx.request.params.matchId } },
          );
        }
      });

      ctx.status = 200;
    } else {
      ctx.body = { detail: JSON.stringify('No es tu turno') };
      ctx.status = 403;
    }
  } catch (error) {
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo terminar el turno') };
    ctx.status = 400;
  }
});

// Comprar objeto
router.post('/:matchId/buy', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
  const player = await ctx.orm.Player.findOne({
    where: {
      UserId: user,
      MatchId: ctx.request.params.matchId,
    },
  });
  const jug = player.numero_jugador;
  if (match.current_player === jug) {
    // Algunos valores necesarios
    const costosPuntos = {
      riel: [['wood', 'rock'], 0],
      mina: [['wood', 'gold'], 1],
      industria: [['copper', 'copper', 'coal', 'coal', 'gold'], 2],
      acuñadura: [['rock', 'rock'], 0],
      enano: [['coal', 'gold', 'copper'], 0],
    };

    const posx = await ctx.request.body.x;
    const posy = await ctx.request.body.y;
    const posx2 = await ctx.request.body.x2;
    const posy2 = await ctx.request.body.y2;
    const tipoBuilding = await ctx.request.body.accion;

    // Revisar si se puede comprar
    const pagar = await verificarPago(ctx, ctx.request.params.matchId, tipoBuilding);

    // Revisar si se puede ubicar
    const ubicar = await verificarLugar(
      ctx,
      ctx.request.params.matchId,
      tipoBuilding,
      posx,
      posy,
      posx2,
      posy2,
    );

    if (pagar) {
      if (ubicar) {
        // Realizar el pago
        await realizarPago(ctx, ctx.request.params.matchId, tipoBuilding);

        // Creación y subir puntos
        try {
          if (tipoBuilding === 'enano') {
            await ctx.orm.Dwarf.create({
              nivel: 1,
              estado: false,
              posicion_x: posx,
              posicion_y: posy,
              PlayerId: player.id,
              MatchId: ctx.request.params.matchId,
            });
          } else {
            await ctx.orm.Building.create({
              tipo: tipoBuilding,
              costo: 0,
              puntos: costosPuntos[tipoBuilding][1],
              posicion_x: posx,
              posicion_y: posy,
              PlayerId: player.id,
              posicion_x2: posx2,
              posicion_y2: posy2,
              MatchId: ctx.request.params.matchId,
            });
          }
          await ctx.orm.Player.update(
            { puntos_victoria: player.puntos_victoria + costosPuntos[tipoBuilding][1] },
            { where: { id: player.id } },
          );

          ctx.status = 201;
          ctx.body = { detail: JSON.stringify('Se realizo la compra de forma correcta') };
        } catch (error) {
          ctx.throw(error);
          ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo realizar la compra') };
          ctx.status = 400;
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('La ubicación no cumple las condiciones') };
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('No se tienen los materiales suficientes para pagar') };
    }
  } else {
    ctx.body = { detail: JSON.stringify('No es tu turno') };
    ctx.status = 403;
  }
});

// Activar un enano
router.post('/:matchId/activate', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
  const player = await ctx.orm.Player.findOne({
    where: {
      UserId: user,
      MatchId: ctx.request.params.matchId,
    },
  });
  const jug = player.numero_jugador;
  if (match.current_player === jug) {
    // console.log('Activar enano');
    const posx = await ctx.request.body.x;
    const posy = await ctx.request.body.y;
    const enano = await ctx.orm.Dwarf.findOne({
      where: {
        posicion_x: posx,
        posicion_y: posy,
        MatchId: ctx.request.params.matchId,
      },
    });
    const currentPlayer = await current(ctx, ctx.request.params.matchId);
    const materialesJugador = await materiales(ctx, ctx.request.params.matchId, currentPlayer.id);

    // Se verifica si es que se puede pagar
    if (materialesJugador.gold >= 1) {
      if (enano) {
        try {
          // Se realiza el pago
          const idMaterial = await ctx.orm.Material.findOne({
            where: {
              materia_prima: 'gold',
              PlayerId: currentPlayer.id,
            },
          });
          await ctx.orm.Material.destroy({
            where: {
              id: idMaterial.id,
            },
          });

          // Se actualiza el nivel en la bdd
          await ctx.orm.Dwarf.update(
            { estado: true },
            { where: { id: enano.id } },
          );

          ctx.body = { detail: JSON.stringify('Se ha activado al enano') };
          ctx.status = 201;
        } catch (error) {
          ctx.throw(error);
          ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo activar al enano') };
          ctx.status = 400;
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('No se a encontrado al enano') };
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('No se tiene las materias primas suficientes') };
    }
  } else {
    ctx.body = { detail: JSON.stringify('No es tu turno') };
    ctx.status = 403;
  }
});

// Subir de nivel al enano
router.post('/:matchId/upgrade', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
  const player = await ctx.orm.Player.findOne({
    where: {
      UserId: user,
      MatchId: ctx.request.params.matchId,
    },
  });
  const jug = player.numero_jugador;
  if (match.current_player === jug) {
    const posx = await ctx.request.body.x;
    const posy = await ctx.request.body.y;
    const enano = await ctx.orm.Dwarf.findOne({
      where: {
        posicion_x: posx,
        posicion_y: posy,
        MatchId: ctx.request.params.matchId,
      },
    });
    const currentPlayer = await current(ctx, ctx.request.params.matchId);
    const materialesJugador = await materiales(ctx, ctx.request.params.matchId, currentPlayer.id);
    const costos = [['coal', 1], ['rock', 1]];

    // console.log('Enano', enano);
    // Se hacen las validaciones
    if ((enano) && (enano.nivel < 3)) {
      if ((materialesJugador[costos[1][0]] >= costos[1][1])
      && (materialesJugador[costos[0][0]] >= costos[0][1])) {
        try {
          // Se realizan los pagos
          const idMateria0 = await ctx.orm.Material.findOne({
            where: {
              materia_prima: costos[0][0],
              PlayerId: currentPlayer.id,
            },
          });

          const idMateria1 = await ctx.orm.Material.findOne({
            where: {
              materia_prima: costos[1][0],
              PlayerId: currentPlayer.id,
            },
          });

          await ctx.orm.Material.destroy({
            where: {
              id: idMateria0.id,
            },
          });

          await ctx.orm.Material.destroy({
            where: {
              id: idMateria1.id,
            },
          });
          // Se actualiza en la bdd
          await ctx.orm.Dwarf.update(
            { nivel: enano.nivel + 1 },
            { where: { id: enano.id } },
          );
          // console.log('Actualizando');
          ctx.body = { detail: JSON.stringify('Se ha subido de nivel al enano') };
          ctx.status = 201;
        } catch (error) {
          ctx.throw(error);
          ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo subir de nivel al enano') };
          ctx.status = 400;
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('No se tiene las materias primas suficientes') };
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('No se ha encontrado al enano o tiene nivel máximo') };
    }
  } else {
    ctx.body = { detail: JSON.stringify('No es tu turno') };
    ctx.status = 403;
  }
});

// Mover dwarfs
router.post('/:matchId/move', async (ctx) => {
  const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
  const user = session.userId;
  const player = await ctx.orm.Player.findOne({
    where: { UserId: user, MatchId: ctx.request.params.matchId },
  });
  const posx = await ctx.request.body.x;
  const posy = await ctx.request.body.y;
  const posx2 = await ctx.request.body.x2;
  const posy2 = await ctx.request.body.y2;

  let primero = false;
  let quiereAtacar = null;
  let ubicar = null;

  if (posx === posx2 && posy === posy2) {
    ctx.status = 200;
    ctx.body = { detail: JSON.stringify('Se mantuvo la posición') };
  } else {
    let enano = await ctx.orm.Dwarf.findOne({
      where: {
        posicion_x: posx,
        posicion_y: posy,
        MatchId: ctx.request.params.matchId,
        PlayerId: player.id,
      },
    });

    if (enano) {
      primero = true;
      quiereAtacar = await verificarAtaque(ctx, ctx.request.params.matchId, posx2, posy2);
    } else {
      enano = await ctx.orm.Dwarf.findOne({
        where: {
          posicion_x: posx2,
          posicion_y: posy2,
          MatchId: ctx.request.params.matchId,
          PlayerId: player.id,
        },
      });
      quiereAtacar = await verificarAtaque(ctx, ctx.request.params.matchId, posx, posy);
    }

    // Si se puede ubicar se actualiza
    if (enano) {
      // Se realiza el ataque
      let atacando = true;
      let frase = '';
      if (quiereAtacar) {
        if (primero) {
          atacando = await realizarAtaque(
            ctx,
            ctx.request.params.matchId,
            posx,
            posy,
            posx2,
            posy2,
          );
        } else {
          atacando = await realizarAtaque(
            ctx,
            ctx.request.params.matchId,
            posx2,
            posy2,
            posx,
            posy,
          );
        }
        if (atacando) {
          frase += 'Atacó y ganó';
        } else {
          frase += 'Atacó y perdió';
        }
      }

      if (primero) {
        ubicar = await verificarLugar(ctx, ctx.request.params.matchId, 'enano', posx2, posy2);
      } else {
        ubicar = await verificarLugar(ctx, ctx.request.params.matchId, 'enano', posx, posy);
      }

      if (ubicar) {
        if (atacando) {
          try {
            if (primero) {
              await ctx.orm.Dwarf.update(
                { posicion_x: posx2, posicion_y: posy2 },
                { where: { id: enano.id } },
              );
            } else {
              await ctx.orm.Dwarf.update(
                { posicion_x: posx, posicion_y: posy },
                { where: { id: enano.id } },
              );
            }
            frase += 'Se cambio de ubicación correctamente';
            ctx.status = 201;
            ctx.body = { detail: JSON.stringify(frase) };
          } catch (error) {
            ctx.throw(error);
            ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo mover al enano') };
            ctx.status = 400;
          }
        } else {
          ctx.status = 200;
          ctx.body = { detail: JSON.stringify('Ataco y perdió') };
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('No se pudo ubicar') };
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('No se selecciono un enano propio') };
    }
  }
});

// Ubicar buildings iniciales
router.post('/:matchId/place', async (ctx) => {
  const currentPlayer = await current(ctx, ctx.request.params.matchId);
  const buildings = await ctx.orm.Building.findAll({
    where: { PlayerId: currentPlayer.id, MatchId: ctx.request.params.matchId },
  });
  const costosPuntos = {
    riel: [['wood', 'rock'], 0],
    mina: [['wood', 'gold'], 1],
    industria: [['copper', 'copper', 'coal', 'coal', 'gold'], 2],
    acuñadura: [['rock', 'rock'], 0],
    enano: [['coal', 'gold', 'copper'], 0],
  };
  if (buildings.length === 0) {
    const posx = await ctx.request.body.x;
    const posy = await ctx.request.body.y;
    const tipoBuilding = await ctx.request.body.accion;

    if (tipoBuilding !== 'mina') {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('Se debe crear una mina primero') };
    } else {
      const ubicar = await verificarInicio(
        ctx,
        ctx.request.params.matchId,
        tipoBuilding,
        posx,
        posy,
        posx,
        posy,
      );

      // Si se puede ubicar se actualiza
      if (ubicar) {
        try {
          await ctx.orm.Building.create({
            tipo: tipoBuilding,
            costo: 0,
            puntos: costosPuntos[tipoBuilding][1],
            posicion_x: posx,
            posicion_y: posy,
            PlayerId: currentPlayer.id,
            posicion_x2: posx,
            posicion_y2: posy,
            MatchId: ctx.request.params.matchId,
          });
          await ctx.orm.Player.update(
            { puntos_victoria: currentPlayer.puntos_victoria + costosPuntos[tipoBuilding][1] },
            { where: { id: currentPlayer.id } },
          );
          ctx.status = 201;
          ctx.body = { detail: JSON.stringify('Se ubico correctamente') };
        } catch (err) {
          ctx.status = 400;
          ctx.body = { detail: JSON.stringify(err.message) };
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('No es posible ubicar en esta posición') };
      }
    }
  } else if (buildings.length <= 1) {
    const posx = ctx.request.body.x;
    const posy = ctx.request.body.y;
    const tipoBuilding = ctx.request.body.accion;
    const posx2 = ctx.request.body.x2;
    const posy2 = ctx.request.body.y2;

    if (tipoBuilding !== 'riel') {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('Se debe crear un riel') };
    } else {
      // console.log(posx, posy);
      // console.log(posx2, posy2);

      // Revisar si se puede ubicar
      const ubicar = await verificarInicio(
        ctx,
        ctx.request.params.matchId,
        tipoBuilding,
        posx,
        posy,
        posx2,
        posy2,
      );

      // Si se puede ubicar se actualiza
      if (ubicar) {
        try {
          await ctx.orm.Building.create({
            tipo: tipoBuilding,
            costo: 0,
            puntos: costosPuntos[tipoBuilding][1],
            posicion_x: posx,
            posicion_y: posy,
            PlayerId: currentPlayer.id,
            posicion_x2: posx2,
            posicion_y2: posy2,
            MatchId: ctx.request.params.matchId,
          });
          await ctx.orm.Player.update(
            { puntos_victoria: currentPlayer.puntos_victoria + costosPuntos[tipoBuilding][1] },
            { where: { id: currentPlayer.id } },
          );
          ctx.status = 201;
          ctx.body = { detail: JSON.stringify('Se ubico correctamente') };
        } catch (err) {
          ctx.status = 400;
          ctx.body = { detail: JSON.stringify(err.message) };
        }
      } else {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('No es posible ubicar en esta posición') };
      }
    }
  } else if (buildings.length <= 2) {
    const tipos = {
      minas: 0,
      rieles: 0,
      otro: 0,
    };

    buildings.forEach((building) => {
      if (building.tipo === 'riel') {
        tipos.rieles += 1;
      } else if (building.tipo === 'mina') {
        tipos.minas += 1;
      } else {
        tipos.otro += 1;
      }
    });

    if (tipos.minas === 1 && tipos.rieles === 1) {
      const posx = await ctx.request.body.x;
      const posy = await ctx.request.body.y;
      const tipoBuilding = await ctx.request.body.accion;

      if (tipoBuilding !== 'mina') {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('Se debe crear una mina primero') };
      } else {
        const ubicar = await verificarInicio(
          ctx,
          ctx.request.params.matchId,
          tipoBuilding,
          posx,
          posy,
          posx,
          posy,
        );
        // console.log('Estoy poniendo la segunda mina');

        // Si se puede ubicar se actualiza
        if (ubicar) {
          try {
            await ctx.orm.Building.create({
              tipo: tipoBuilding,
              costo: 0,
              puntos: costosPuntos[tipoBuilding][1],
              posicion_x: posx,
              posicion_y: posy,
              PlayerId: currentPlayer.id,
              posicion_x2: posx,
              posicion_y2: posy,
              MatchId: ctx.request.params.matchId,
            });
            await ctx.orm.Player.update(
              { puntos_victoria: currentPlayer.puntos_victoria + costosPuntos[tipoBuilding][1] },
              { where: { id: currentPlayer.id } },
            );
            ctx.status = 201;
            ctx.body = { detail: JSON.stringify('Se ubico correctamente') };
          } catch (err) {
            ctx.status = 400;
            ctx.body = { detail: JSON.stringify(err.message) };
          }
        } else {
          ctx.status = 400;
          ctx.body = { detail: JSON.stringify('No se puede ubicar en esa posicion') };
        }
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('Se debe construir una mina y un riel antes') };
    }
  } else if (buildings.length <= 3) {
    const tipos = {
      minas: 0,
      rieles: 0,
      otro: 0,
    };

    buildings.forEach((building) => {
      if (building.tipo === 'riel') {
        tipos.rieles += 1;
      } else if (building.tipo === 'mina') {
        tipos.minas += 1;
      } else {
        tipos.otro += 1;
      }
    });
    if (tipos.minas === 2 && tipos.rieles === 1) {
      const posx = ctx.request.body.x;
      const posy = ctx.request.body.y;
      const tipoBuilding = ctx.request.body.accion;
      const posx2 = ctx.request.body.x2;
      const posy2 = ctx.request.body.y2;

      if (tipoBuilding !== 'riel') {
        ctx.status = 400;
        ctx.body = { detail: JSON.stringify('Se debe crear un riel') };
      } else {
        // console.log('Estoy poniendo el segundo riel');
        // console.log(posx, posy);
        // console.log(posx2, posy2);
        // Revisar si se puede ubicar
        const ubicar = await verificarInicio(
          ctx,
          ctx.request.params.matchId,
          tipoBuilding,
          posx,
          posy,
          posx2,
          posy2,
        );

        // Si se puede ubicar se actualiza
        if (ubicar) {
          try {
            await ctx.orm.Building.create({
              tipo: tipoBuilding,
              costo: 0,
              puntos: costosPuntos[tipoBuilding][1],
              posicion_x: posx,
              posicion_y: posy,
              PlayerId: currentPlayer.id,
              posicion_x2: posx2,
              posicion_y2: posy2,
              MatchId: ctx.request.params.matchId,
            });
            await ctx.orm.Player.update(
              { puntos_victoria: currentPlayer.puntos_victoria + costosPuntos[tipoBuilding][1] },
              { where: { id: currentPlayer.id } },
            );
            ctx.status = 201;
            ctx.body = { detail: JSON.stringify('Se ubico correctamente') };
          } catch (err) {
            ctx.status = 400;
            ctx.body = { detail: JSON.stringify(err.message) };
          }
        } else {
          ctx.status = 400;
          ctx.body = { detail: JSON.stringify('No se puede ubicar en esa posicion') };
        }
      }
    } else {
      ctx.status = 400;
      ctx.body = { detail: JSON.stringify('Se debe construir una mina primero') };
    }
  } else {
    ctx.status = 400;
    ctx.body = { detail: JSON.stringify('Ya ubico la máxima cantidad de buildings posibles') };
  }
});

// Armar/actualizar el juego
router.get('/:matchId', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.request.params.matchId);
    if (!(match === null)) {
      const buildings = await ctx.orm.Building.findAll({
        where: { MatchId: ctx.request.params.matchId },
      });

      if (buildings.length >= match.cantidad_jugadores * 4) {
        await ctx.orm.Match.update(
          { iniciada: true },
          { where: { id: ctx.request.params.matchId } },
        );
      }
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const user = session.userId;
      const player = await ctx.orm.Player.findOne({
        where: { UserId: user, MatchId: ctx.request.params.matchId },
      });

      // const Tiempo = await tiempo(ctx, ctx.request.params.matchId);
      const InfoJugadores = await infojugadore(ctx, ctx.request.params.matchId);
      const Tablero = await tablero(ctx, ctx.request.params.matchId);
      const Rieles = await rieles(ctx, ctx.request.params.matchId);
      const Hexagonos = await hexagonos(ctx, ctx.request.params.matchId);
      const Saqueadores = await saqueadores(ctx, ctx.request.params.matchId);
      const Materiales = await materiales(ctx, ctx.request.params.matchId, player.id);
      const CurrentPlayer = await tocaJugar(ctx, ctx.request.params.matchId, player);
      const Ganador = await nombreGanador(ctx, ctx.request.params.matchId);
      const Match = await ctx.orm.Match.findOne({ where: { id: ctx.request.params.matchId } });
      const informacion = {
        jugadores: InfoJugadores,
        tablero: {
          tipo: Tablero,
          rieles: Rieles,
          contenido: Hexagonos,
        },
        materiales: Materiales,
        saqueadores: Saqueadores,
        currentplayer: CurrentPlayer,
        ganador: Ganador,
        Iniciada: Match.iniciada,
      };
      ctx.status = 200;
      ctx.body = JSON.stringify(informacion);
    } else {
      ctx.body = { detail: JSON.stringify('No se ha encontrado esta partida') };
      ctx.status = 404;
    }
  } catch (error) {
    ctx.throw(error);
    ctx.body = { detail: JSON.stringify('Ha ocurrido un problema, no se pudo obtener el grid') };
    ctx.status = 400;
  }
});

module.exports = router;
