import GridLocation from 'data-structures/location/GridLocation';

import Graph from './Graph';

class GridGraph extends Graph {
  static DIRS: [GridLocation, GridLocation, GridLocation, GridLocation];

  nCol: number;

  nRow: number;

  data: GridLocation[][];

  walls: Set<GridLocation>;

  constructor(nRow: number, nCol: number, data?: GridLocation[][]) {
    super();

    this.nRow = nRow;
    this.nCol = nCol;

    this.data =
      data ||
      Array.from({ length: nRow }, (_, row) =>
        Array.from({ length: nCol }, (__, col) => new GridLocation(row, col)),
      );

    this.walls = new Set();
  }

  isInBound(location: GridLocation): boolean {
    if (!location) return false;

    const { row, col } = location;
    return row >= 0 && row < this.nRow && col >= 0 && col < this.nCol;
  }

  isPassable(location: GridLocation): boolean {
    return !this.walls.has(location);
  }

  cell(row: number, col: number): GridLocation | null {
    return this.data[row]?.[col] || null;
  }

  neighbors(location: GridLocation): GridLocation[] {
    const res: GridLocation[] = [];

    GridGraph.DIRS.forEach((dir) => {
      const row = location.row + dir.row;
      const col = location.col + dir.col;
      const next = this.data[row]?.[col];

      if (this.isInBound(next) && this.isPassable(next)) {
        res.push(next);
      }
    });

    // Ugly paths
    if ((location.row + location.col) % 2 === 0) res.reverse();

    return res;
  }
}

GridGraph.DIRS = [
  // East, West, North, South
  new GridLocation(0, 1),
  new GridLocation(0, -1),
  new GridLocation(1, 0),
  new GridLocation(-1, 0),
];

export default GridGraph;
