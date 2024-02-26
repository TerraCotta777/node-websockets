import db, { createNewGame, joinToRoom } from '../db';
import { WSwithPlayer } from 'src/types';
import { updateRoom } from './updateRoom';

export function createGame(ws: WSwithPlayer, data: { indexRoom: number }) {
    const room = joinToRoom(data.indexRoom, ws.player);
    const otherPlayerId = room.roomUsers.find(
        (player) => player.index !== ws.player.id,
    ).index;
    const otherPlayer = db.players.find(
        (player) => player.id === otherPlayerId,
    );
    let game = createNewGame(ws.player.id, otherPlayerId);
    ws.send(
        JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({
                idGame: game.idGame,
                idPlayer: game.player1,
            }),
            id: 0,
        }),
    );
    otherPlayer.ws.send(
        JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({
                idGame: game.idGame,
                idPlayer: game.player2,
            }),
            id: 0,
        }),
    );
    updateRoom(ws)
}
