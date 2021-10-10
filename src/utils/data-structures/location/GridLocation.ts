class GridLocation {
  row: number;

  col: number;

  isWall: boolean;

  isDesert: boolean;

  isVisited: boolean;

  isPathStep: boolean;

  isStart: boolean;

  isEnd: boolean;

  constructor(
    row: number,
    col: number,
    isWall: boolean,
    isDesert: boolean,
    isVisited: boolean,
    isPathStep: boolean,
    isStart: boolean,
    isEnd: boolean,
  ) {
    this.row = row;
    this.col = col;
    this.isWall = isWall;
    this.isDesert = isDesert;
    this.isVisited = isVisited;
    this.isPathStep = isPathStep;
    this.isStart = isStart;
    this.isEnd = isEnd;
  }

  equal(value: GridLocation) {
    return this.row === value.row && this.col === value.col;
  }
}

export default GridLocation;
