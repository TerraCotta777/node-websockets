import dotenv from 'dotenv';
import WebSocket from 'ws';
import db, { addPlayer, findPlayer } from './db';

dotenv.config();
const PORT = process.env.PORT ? +process.env.PORT : 4000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const request = JSON.parse(message.toString());
        switch (request.type) {
            case 'reg':
                let player = findPlayer(request.data.name);
                if (!player) {
                    const data = JSON.parse(request.data);
                    player = addPlayer(data.name, data.password);
                    const dataToSend = {
                        name: player.name,
                        index: db.players.indexOf(player),
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
                break;
        }
    });
});
