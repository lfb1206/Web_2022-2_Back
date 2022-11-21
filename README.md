Para esta entrega se creo una base de datos, para la cual es necesario tener el archivo .env con los siguientes datos:

DB_USER = webeam_user
DB_NAME = webeam_db2
DB_PASSWORD = webeam_123456
DB_HOST = localhost

DB_USER = webeam_user

DB_NAME = webeam_db2

DB_PASSWORD = webeam_123456

DB_HOST = localhost

APP_KEYS = llavesecreta

SECRET_KEY = llavesecreta

JWT_SECRET = llavesecretajw

pudiendo cambiar según los que tenga cada lector.

Se agregaron nuevas columnas para las instancias Matches (current_player, usuario_creados, jugador_ganador) y Dwarves (MatchId). Se creo la instancia de sesiones conectada a los usuarios.

Se puede crear una cuenta, con las validaciones correspondientes, logearse, realizar logout, ver y eliminar la cuenta. Es posible crear partidas y si se tiene el token borrar las partidas propias. También se puede unir a otras partidas cumpliendo la validación.

Dentro del juego mismo, se comienza con la ubicación de algunas edificaciones bases, se puede lanzar los dados verificando si es que es necesario eliminar cartas, avanzan los looter y defenderse si la ciudad es atacada (Se cambio la formula para decidir los puntos de ataque y de defensa, ademas de que ahora se ganan puntos  de victoria y se pierden a los enanos).

Se pueden comprar rieles, pozos, minas y acuñaduras. Realizando las validaciones de dinero y ubicación. Se puede subir de nivel al enano, activarlo, moverlo y utilizarlo para atacar a otros jugadores (Perdiendo al enano del jugador perdedor).

Se verifica si es que algún jugador gano la partida, avizando a todos los jugadores y dandola por terminada.

Por otra parte, para esta entrega se utilizarón branches y eslint. 

Para poder vizualisar la documentacion de la API y de los EndPoints se utilizó postman, al cual se puede llegar a través del siguiente link: https://documenter.getpostman.com/view/23890730/2s8YehSbjc
