import { DB, User } from "src/types";
import { WebSocket } from "ws";

let db: DB = {
    players: [],
    games: [],
    rooms: []
}

export function createPlayer(name: string, password: string, ws: WebSocket) {
    const player = {
        id: db.players.length,
        name,
        password,
        wins: 0,
        ws
    };
    db.players.push(player);
    return player;
}

export function findPlayer(name: string) {
    return db.players.find((player) => player.name === name);
}

export function createRoom(player: User) {
    const room = {
        roomId: db.rooms.length,
        roomUsers: [{ name: player.name, index: player.id }]
    }
    db.rooms.push(room)
    return room
}

export function joinToRoom(roomId: number, player: User) {
    const room = db.rooms.find(room => room.roomId === roomId)
    if (room) {
        if (room.roomUsers.length < 2) {
            room.roomUsers.push({ name: player.name, index: player.id })
            return room
        }
    } else return null;
}

export function createNewGame(player1: number, player2: number) {
    const game = {
        idGame: db.games.length,
        player1,
        player2
    }
    db.games.push(game)
    return game
}

export default db