"use client";

import { useState } from 'react';
import SnakeGame from "@/components/SnakeGame";
import Link from 'next/link';

export default function Home() {
  // State untuk skor, status game over, dan reset
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);

  // Fungsi untuk memperbarui skor
  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  // Fungsi untuk menangani akhir permainan
  const handleGameOver = () => {
    setGameOver(true);
  };

  // Fungsi untuk mereset permainan
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  // Fungsi untuk mengubah arah permainan berdasarkan tombol yang ditekan
  const handleDirectionChange = (direction) => {
    const event = new KeyboardEvent('keydown', { key: direction });
    document.dispatchEvent(event);
  };

  return (
    <div className="div-game" style={{ textAlign: 'center' }}>
      <h1>Snake Game</h1>
      <h2>Score: {score}</h2>
      <SnakeGame onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} reset={reset} />
      {gameOver && <button onClick={resetGame}>Play Again</button>}
      <div className="controls">
        <button onClick={() => handleDirectionChange('ArrowUp')}>↑</button>
        <button onClick={() => handleDirectionChange('ArrowLeft')}>←</button>
        <button onClick={() => handleDirectionChange('ArrowDown')}>↓</button>
        <button onClick={() => handleDirectionChange('ArrowRight')}>→</button>
      </div>
      <div className="project">
        <p>This project is in </p>
        <Link href="https://home.amikom.ac.id/">
          <img width="96" height="96" src="https://jogjaversitas.id/wp-content/uploads/2020/08/Amikom.png" alt="github"/>
        </Link>
      </div>
    </div>
  );
}
