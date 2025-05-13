import "../styles/Maze.css"

type Cell = 0 | 1 | 'S' | 'E';
type MazeGrid = Cell[][];

  interface MazeProps {
    grid: MazeGrid;
  }

  const Maze: React.FC<MazeProps & { playerPosition: { row: number; col: number } }> = ({ grid, playerPosition }) => {
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
            transform: `translate(${playerPosition.col * 25}px, ${playerPosition.row * 25}px)`,
          }}
        />
        </div>
       
      </div>
    );
  };
  export default Maze;