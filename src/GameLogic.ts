import { CellCoordinates, CellOwner, GameState, Player } from "./Components/Game"

const isRowCompleted = (grid: GameState, player: CellOwner) => {
    return grid.some(row => row.every(val => val === player))
}

const isColumnCompleted = (grid: GameState, player: CellOwner) => {
    for (let column = 0; column < 3; column++) {
        const items = [grid[0][column], grid[1][column], grid[2][column]]
        const hasPlayerWon = items.every(item => item === player)
        if (hasPlayerWon) {
            return hasPlayerWon
        }
    }

    return false;
}

const isDiagonalCompleted = (grid: GameState, player: CellOwner) => {
    const diagonal1 = [grid[0][0], grid[1][1], grid[2][2]];
    const diagonal2 = [grid[0][2], grid[1][1], grid[2][0]]

    return diagonal1.every(item => item === player) || diagonal2.every(item => item === player)
}

export const checkGameStatus = (grid: GameState, player: Player) => {
    return isRowCompleted(grid, player) || isColumnCompleted(grid, player) || isDiagonalCompleted(grid, player)

}

export const getNewGameState = (grid: GameState, player: CellOwner, {row, column}: CellCoordinates): GameState => {
    const newGrid = grid.map(row => [...row]);
    newGrid[row][column] = player;

    return newGrid as GameState
}

export const initialGameState: GameState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];