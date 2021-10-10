import GridLocation from 'utils/data-structures/location/GridLocation';

export const isGridLocationInBound = (
  location: GridLocation | null | undefined,
  gridNRow: number,
  gridNCol: number,
) => {
  if (!location) return false;

  const { row, col } = location;
  return row >= 0 && row < gridNCol && col >= 0 && col < gridNCol;
};

export const isGridLocationPassable = (location: GridLocation) => !location.isWall;

const DIRS = [
  // TODO: Explain the below order
  // East, West, North, South
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: 0 },
];
export const getLocationNeighbors = (gridData: GridLocation[][], location: GridLocation) => {
  const gridNRow = gridData.length;
  const gridNCol = gridData[0].length;

  const res: GridLocation[] = [];

  DIRS.forEach((dir) => {
    const row = location.row + dir.row;
    const col = location.col + dir.col;
    const next = gridData[row]?.[col];

    if (isGridLocationInBound(next, gridNRow, gridNCol) && isGridLocationPassable(next)) {
      res.push(next);
    }
  });

  // Ugly paths
  if ((location.row + location.col) % 2 === 0) res.reverse();

  return res;
};

export const getCost = (locationA: GridLocation, locationB: GridLocation) => {
  let res = 0;
  if (locationA.isDesert) res += 2.5;
  if (locationB.isDesert) res += 2.5;

  return res === 0 ? 1 : res;
};
