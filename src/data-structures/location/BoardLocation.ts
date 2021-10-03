import GridLocation from './GridLocation';

class BoardLocation extends GridLocation {
  isVisited: boolean;

  isPathStep: boolean;

  isStart: boolean;

  isEnd: boolean;

  isWall: boolean;

  constructor(
    row: number,
    col: number,
    isVisited: boolean,
    isPathStep: boolean,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
  ) {
    super(row, col);
    this.isVisited = isVisited;
    this.isPathStep = isPathStep;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
  }
}

export default BoardLocation;
