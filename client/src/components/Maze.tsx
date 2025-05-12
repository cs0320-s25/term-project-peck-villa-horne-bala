import "../styles/Maze.css"

type Cell = 0 | 1 | 'S' | 'E';
type MazeGrid = Cell[][];

  interface MazeProps {
    grid: MazeGrid;
  }

const Maze: React.FC<MazeProps> = ({ grid }) => {
    return (
      <div className="maze-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`cell cell-${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  export default Maze;