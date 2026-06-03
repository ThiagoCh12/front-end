import Row from "./Row";

export default function Board({ board }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <Row key={rowIndex} row={row} />
      ))}
    </div>
  );
}