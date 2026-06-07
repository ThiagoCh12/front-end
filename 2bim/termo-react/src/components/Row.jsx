import Cell from "./Cell";

export default function Row({ row }) {
  return (
    <div className="row">
      {row.map((cell, index) => (
        <Cell
          key={index}
          value={cell.letter}
          status={cell.status}
        />
      ))}
    </div>
  );
}