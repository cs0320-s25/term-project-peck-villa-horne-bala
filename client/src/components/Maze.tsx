import "../styles/Maze.css"

type Cell = 0 | 1 | 'S' | 'E';
type MazeGrid = Cell[][];

  interface MazeProps {
    grid: MazeGrid;
  }

  const Maze: React.FC<MazeProps & { playerPosition: { row: number; col: number } }> = ({ grid, playerPosition }) => {
    return (
      <div className="maze-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => {
              const isPlayer = playerPosition.row === rowIndex && playerPosition.col === colIndex;
              return (
                <div key={colIndex} className={`cell cell-${cell}`}>
                  {isPlayer && <div className="player" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  export default Maze;