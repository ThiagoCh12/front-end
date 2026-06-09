import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import "./App.css";

const SECRET_WORD = "casal";
const ROWS = 6;
const COLS = 5;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ letter: "", status: "" }))
  );
}

// cópia profunda do tabuleiro para atualizar o estado sem mutar o anterior
function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  function handleLetter(letter) {
    if (gameOver || currentCol >= COLS) return;

    const newBoard = cloneBoard(board);
    newBoard[currentRow][currentCol] = { letter, status: "" };

    setBoard(newBoard);
    setCurrentCol(currentCol + 1);
  }

  function handleBackspace() {
    if (gameOver || currentCol === 0) return;

    const newBoard = cloneBoard(board);
    newBoard[currentRow][currentCol - 1] = { letter: "", status: "" };

    setBoard(newBoard);
    setCurrentCol(currentCol - 1);
  }

  function checkWord(word) {
    const result = [];
    for (let i = 0; i < COLS; i++) {
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

  function handleEnter() {
    if (gameOver || currentCol < COLS) return;

    const word = board[currentRow]
      .map((c) => c.letter)
      .join("")
      .toLowerCase();

    const result = checkWord(word);

    const newBoard = cloneBoard(board);
    for (let i = 0; i < COLS; i++) {
      newBoard[currentRow][i].status = result[i];
    }
    setBoard(newBoard);

    if (word === SECRET_WORD) {
      setWinner(true);
      setGameOver(true);
      return;
    }

    if (currentRow === ROWS - 1) {
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
    setBoard(createEmptyBoard());
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setWinner(false);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (gameOver) return;

      const key = event.key.toLowerCase();

      if (/^[a-z]$/.test(key)) {
        handleLetter(key);
      } else if (key === "backspace") {
        handleBackspace();
      } else if (key === "enter") {
        handleEnter();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRow, currentCol, board, gameOver]);

  return (
    <main>
      <h1>Termo</h1>

      <Board board={board} />
      <Keyboard onKeyPress={handleVirtualKey} />

      {gameOver && (
        <div className="result">
          {winner
            ? "🎉 Você venceu!"
            : `❌ Você perdeu! A palavra era "${SECRET_WORD.toUpperCase()}".`}
          <button onClick={resetGame}>Jogar novamente</button>
        </div>
      )}
    </main>
  );
}
