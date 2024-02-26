import { WebSocket } from 'ws';

export interface User {
    id: number;
    name: string;
    password: string;
    wins: number;
    ws: WebSocket;
}

export interface WSwithPlayer extends WebSocket {
    player: User;
}

export interface Room {
    roomId: number;
    roomUsers: { name: string; index: number}[];
}

export interface Game {
    idGame: number;
    player1: number;
    player2: number;
}

export interface DB {
    players: User[];
    games: Game[];
    rooms: Room[];
}
