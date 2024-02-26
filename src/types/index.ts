export interface User {
    name: string
    password: string
    wins: number
}

export interface DB {
    players: User[]
    games: []
}