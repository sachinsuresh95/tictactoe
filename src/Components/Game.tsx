import { Fragment, useReducer } from "react";
import Cell from "./Cell";
import {
  checkGameStatus,
  getNewGameState,
  initialGameState,
} from "../GameLogic";

export type Player = 1 | 2;
export type CellOwner = null | Player;

type GridRow = [CellOwner, CellOwner, CellOwner];

export type GameState = [GridRow, GridRow, GridRow];

export interface CellCoordinates {
  row: number;
  column: number;
}

interface State {
  currentPlayer: Player;
  winner: Player | null;
  gridState: GameState;
}

enum ACTION_TYPES {
  UPDATE_GRID_CONTENTS,
}

interface Action {
  type: ACTION_TYPES;
  value: CellCoordinates;
}

const reducer = (state: State, action: Action): State => {
  console.log({ action });
  switch (action.type) {
    case ACTION_TYPES.UPDATE_GRID_CONTENTS: {
      const newGameState = getNewGameState(
        state.gridState,
        state.currentPlayer,
        action.value
      );
      const isWinner = checkGameStatus(newGameState, state.currentPlayer);
      const nextPlayer = state.currentPlayer === 1 ? 2 : 1;
      return {
        currentPlayer: nextPlayer,
        winner: isWinner ? state.currentPlayer : null,
        gridState: newGameState,
      };
    }
    default:
      return state;
  }
};

const initialState: State = {
  currentPlayer: 1,
  winner: null,
  gridState: initialGameState,
};

const Grid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clickHandler = (position: CellCoordinates) => {
    if (state.winner) {
      return
    }
    dispatch({ type: ACTION_TYPES.UPDATE_GRID_CONTENTS, value: position });
  };

  return (
    <>
      {state.winner ? (
        <div className="mb-4">Player {state.winner} wins!!</div>
      ) : (
        <div className="mb-4">Player {state.currentPlayer}'s turn</div>
      )}
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {state.gridState.map((row, index) => {
          return (
            <Fragment key={index}>
              {row.map((cell, column) => {
                return (
                  <Cell
                    key={"" + index + column}
                    position={{ row: index, column }}
                    owner={cell}
                    clickHandler={clickHandler}
                    currentPlayer={state.currentPlayer}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
