import GridLocation from './GridLocation';

class GridGraph {
  static DIRS: [GridLocation, GridLocation, GridLocation, GridLocation];

  width: number;

  height: number;

  walls: Set<GridLocation>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  isInBound(location: GridLocation): boolean {
    const { x, y } = location;
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isPassable(location: GridLocation): boolean {
    return !this.walls.has(location);
  }

  neighbors(location: GridLocation): GridLocation[] {
    const res: GridLocation[] = [];

    GridGraph.DIRS.forEach((dir) => {
      const next: GridLocation = {
        x: location.x + dir.x,
        y: location.y + dir.y,
      };

      if (this.isInBound(next) && this.isPassable(next)) {
        res.push(next);
      }
    });

    // Ugly paths
    if ((location.x + location.y) % 2 === 0) res.reverse();

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
