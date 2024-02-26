import db from "../db";
import { WSwithPlayer } from "../types";

export function updateRoom(ws: WSwithPlayer) {
    const roomsWithOnePlayer = db.rooms.filter(
        (room) => room.roomUsers.length === 1,
    );
    console.log(roomsWithOnePlayer);
    ws.send(
        JSON.stringify({
            type: 'update_room',
            data: JSON.stringify(roomsWithOnePlayer),
            id: 0,
        }),
    );
}