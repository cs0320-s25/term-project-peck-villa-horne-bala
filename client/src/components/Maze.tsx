import React from "react";

type Cell = 0 | 1 | 2 | 3 | 'S' | 'E';
type MazeGrid = Cell[][];

interface MazeProps {
  grid: MazeGrid;
  playerPosition: { row: number; col: number };
}

const Maze: React.FC<MazeProps> = ({ grid, playerPosition }) => {
  return (
    <div className="maze-wrapper">
      <div className="maze-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`cell cell-${cell}`}></div>
            ))}
          </div>
        ))}
        <div
          className="player"
          style={{
            transform: `translate(${playerPosition.col * 25 + 2.5}px, ${playerPosition.row * 25 + 2.5}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default Maze;