import { DB } from "src/types";

let db: DB = {
    players: [],
    games: []
}

export function addPlayer(name, password) {
    const player = {
        name,
        password,
        wins: 0,
    };
    db.players.push(player);
    return player;
}

export function findPlayer(name) {
    return db.players.find((player) => player.name === name);
}

export default db