import { CellCoordinates, CellOwner, Player } from "./Game";

interface Props {
  position: CellCoordinates;
  owner: CellOwner;
  currentPlayer: Player;
  clickHandler: (position: CellCoordinates, player: Player) => void;
}

const Cell = ({ position, owner, currentPlayer, clickHandler }: Props) => {
  const PlayerSymbolMap = {
    1: "X",
    2: "O",
  };

  const handleClick = () => {
    if (owner) {
      return;
    }

    clickHandler(position, currentPlayer);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer text-black flex justify-center items-center"
      style={{ height: "100px", width: "100px" }}
    >
      {owner && <span>{PlayerSymbolMap[owner]}</span>}
    </div>
  );
};

export default Cell;
