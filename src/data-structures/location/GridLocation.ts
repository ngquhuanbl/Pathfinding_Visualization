import Location from './Location';

class GridLocation extends Location {
  row: number;

  col: number;

  constructor(row: number, col: number) {
    super();
    this.row = row;
    this.col = col;
  }

  equal(value: GridLocation) {
    return this.row === value.row && this.col === value.col;
  }
}

export default GridLocation;
