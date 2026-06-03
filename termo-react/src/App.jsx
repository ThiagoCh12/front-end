import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import "./App.css";

const [gameOver, setGameOver] = useState(false);
const [winner, setWinner] = useState(false);

const SECRET_WORD = "casal";

const initialBoard = Array.from({ length: 6 }, () =>
  Array.from({ length: 5 }, () => ({
    letter: "",
    status: ""
  }))
);


export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  function handleLetter(letter) {
    if (gameOver) return;
    if (currentCol >= 5) return;

    const newBoard = [...board];

    newBoard[currentRow][currentCol] = {
      letter,
      status: ""
    };

    setBoard(newBoard);
    setCurrentCol(currentCol + 1);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (gameOver) return;

      const key = event.key.toLowerCase();

      if (/^[a-z]$/.test(key)) {
        handleLetter(key);
      }

      if (key === "backspace") {
        handleBackspace();
      }

      if (key === "enter") {
        handleEnter();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentRow, currentCol, board]);

  return (
    <main>
      <h1>Termo</h1>

      <Board board={board} />
      <Keyboard onKeyPress={handleVirtualKey} />
      {gameOver && (
        <div className="result">
          {winner ? "🎉 Você venceu!" : "❌ Você perdeu!"}
          <button onCLick={resetGame}>
            Jogar novamente
          </button>
        
        </div>
      )}
    </main>
  );
}

function checkWord(word) {
  const result = [];

  for (let i = 0; i < 5; i++) {
    if (word[i] === SECRET_WORD[i]) {
      result.push("correct"); // verde
    } else if (SECRET_WORD.includes(word[i])) {
      result.push("present"); // amarelo
    } else {
      result.push("absent"); // cinza
    }
  }

  return result;
}

function handleBackspace() {
  if (currentCol === 0) return;

  const newBoard = [...board];
  newBoard[currentRow][currentCol - 1] = "";

  setBoard(newBoard);
  setCurrentCol(currentCol - 1);
}

function handleEnter() {
  if (gameOver) return;
  if (currentCol < 5) return;

  const word = board[currentRow]
    .map((c) => c.letter)
    .join("")
    .toLowerCase();

  const result = checkWord(word);

  const newBoard = [...board];

  for (let i = 0; i < 5; i++) {
    newBoard[currentRow][i].status = result[i];
  }

  setBoard(newBoard);
    const isWinner = word === SECRET_WORD;

  if (isWinner) {
    setWinner(true);
    setGameOver(true);
    return;
  }
    if (currentRow === 5) {
    setGameOver(true);
    return;
  }

  setCurrentRow(currentRow + 1);
  setCurrentCol(0);
}

function handleVirtualKey(key) {
  if (gameOver) return;

  if (key === "enter") return handleEnter();
  if (key === "back") return handleBackspace();

  handleLetter(key);
}

function resetGame() {
  setBoard(initialBoard);
  setCurrentRow(0);
  setCurrentCol(0);
  setGameOver(false);
  setWinner(false);
}