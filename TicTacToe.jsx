import React, { useState } from 'react';
import '../styles/start.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = (index) => {
    const newBoard = [...board];

    if (calculateWinner(board) || newBoard[index]) {
      return;
    }

    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(false);
    setPlayer1('');
    setPlayer2('');
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? player1 : player2}`;
  } else if (board.every((square) => square !== null)) {
    status = 'It\'s a tie!';
  } else if (gameStarted) {
    status = `Next player: ${xIsNext ? player1 : player2}`;
  }

  const startGame = () => {
    if (player1.trim() !== '' && player2.trim() !== '') {
      setGameStarted(true);
    }
  };

  return (
    <div className="game-container">
      <h1>Welcome To Tic Tac Toe</h1>
      {!gameStarted ? (
        <div className="start-container">
          <input
            type="text"
            placeholder="Enter Player 1's name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Enter Player 2's name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <br></br>
          <br></br>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <div className="status">{status}</div>
          <div className="board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <br></br>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

// Function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;