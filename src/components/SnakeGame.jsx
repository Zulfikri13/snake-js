"use client";
import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = ({ onScoreUpdate, onGameOver, reset }) => {
  const canvasRef = useRef(null); // Referensi ke elemen canvas
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const tileSize = 20; // Ukuran tiap tile di dalam game
  const canvasSize = 400; // Ukuran canvas game

  // Efek untuk mereset permainan saat 'reset' berubah
  useEffect(() => {
    if (reset) {
      setSnake([
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ]);
      setFood({ x: 15, y: 15 });
      setDirection({ x: 1, y: 0 });
      setNextDirection({ x: 1, y: 0 });
      setScore(0);
      setGameOver(false);
      onScoreUpdate(0);
    }
  }, [reset, onScoreUpdate]);

  // Efek untuk menangani rendering dan logika game
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    // Fungsi untuk menangani input keyboard
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          e.preventDefault(); // Mencegah pergerakan halaman
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          e.preventDefault(); // Mencegah pergerakan halaman
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          e.preventDefault(); // Mencegah pergerakan halaman
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          e.preventDefault(); // Mencegah pergerakan halaman
          break;
      }
    };

    // Fungsi untuk menggerakkan ular
    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = { x: newSnake[0].x + nextDirection.x, y: newSnake[0].y + nextDirection.y };

      // Memeriksa tabrakan dengan dinding
      if (
        head.x < 0 ||
        head.x >= canvasSize / tileSize ||
        head.y < 0 ||
        head.y >= canvasSize / tileSize
      ) {
        setGameOver(true);
        onGameOver();
        return;
      }

      // Memeriksa tabrakan dengan tubuh ular sendiri
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          onGameOver();
          return;
        }
      }

      newSnake.unshift(head);
      setDirection(nextDirection);

      // Memeriksa tabrakan dengan makanan
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * (canvasSize / tileSize)),
          y: Math.floor(Math.random() * (canvasSize / tileSize)),
        });
        setScore(score + 1);  // Meningkatkan skor
        onScoreUpdate(score + 1);  // Memperbarui skor di komponen induk
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    // Fungsi untuk menggambar game
    const drawGame = () => {
      context.clearRect(0, 0, canvasSize, canvasSize);

      // Menggambar makanan
      context.fillStyle = 'red';
      context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

      // Menggambar ular
      context.fillStyle = 'green';
      for (let segment of snake) {
        context.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
      }

      if (gameOver) {
        context.fillStyle = 'white';
        context.font = 'bold 45px sans-serif';
        context.shadowColor = 'black';
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 4;
        const text = 'Game Over';
        const textWidth = context.measureText(text).width;
        context.fillText(text, (canvasSize - textWidth) / 2, canvasSize / 2);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const gameLoop = setInterval(() => {
      moveSnake();
      drawGame();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop);
    };
  }, [snake, direction, nextDirection, food, gameOver, score, onScoreUpdate, onGameOver]);

  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
};

export default SnakeGame;
