import dotenv from 'dotenv';
import WebSocket from 'ws';
import db, { createNewGame, createRoom, joinToRoom } from './db';
import { WSwithPlayer } from './types';
import { reg } from './responses/reg';
import { updateRoom } from './responses/updateRoom';
import { createGame } from './responses/createGame';

dotenv.config();
const PORT = process.env.PORT ? +process.env.PORT : 4000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws: WSwithPlayer) => {
    ws.on('message', (message) => {
        const request = JSON.parse(message.toString());
        switch (request.type) {
            case 'reg':
                reg(ws, JSON.parse(request.data));
                updateRoom(ws);
                break;
            case 'create_room':
                createRoom(ws.player);
                updateRoom(ws);
                break;
            case 'add_user_to_room':
                createGame(ws, JSON.parse(request.data));
        }
    });
});
