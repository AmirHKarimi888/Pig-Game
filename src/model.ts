interface player {
    currentScore: number;
    score: number;
}

const playerOne: player = {
    currentScore: 0,
    score: 0
}

const playerTwo: player = {
    currentScore: 0,
    score: 0
}

export const state = {
    playerOne: playerOne,
    playerTwo: playerTwo,
    diceNumber: 3,
    role: 1
}