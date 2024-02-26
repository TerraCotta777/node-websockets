import db, { createPlayer, findPlayer } from '../db';
import { WSwithPlayer } from '../types';

export function reg(
    ws: WSwithPlayer,
    data: { name: string; password: string },
) {
    let player = findPlayer(data.name);
    if (!player) {
        player = createPlayer(data.name, data.password, ws);
        const dataToSend = {
            name: player.name,
            index: db.players.find((user) => user.name === player.name),
            error: false,
            errorText: '',
        };
        ws.send(
            JSON.stringify({
                type: 'reg',
                data: JSON.stringify(dataToSend),
                id: 0,
            }),
        );
    }
    ws.player = player;
}
