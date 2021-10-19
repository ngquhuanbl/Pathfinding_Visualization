import GridLocation from 'utils/data-structures/location/GridLocation';
import Queue from 'utils/data-structures/queue/Queue';
import { getLocationNeighbors } from 'utils/grid';

import { CameFrom } from './types';

const bfsEarlyExit = (
  gridData: GridLocation[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  visitedCallback: (location: GridLocation) => void,
): CameFrom => {
  const frontier = new Queue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();

  const start = gridData[startRow][startCol];
  const end = gridData[endRow][endCol];

  frontier.enqueue(start);
  cameFrom.set(start, null);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (visitedCallback) visitedCallback(current);

    if (current.equal(end)) break;

    getLocationNeighbors(gridData, current).forEach((next) => {
      if (!cameFrom.has(next)) {
        cameFrom.set(next, current);
        frontier.enqueue(next);
      }
    });
  }

  return cameFrom;
};

export default bfsEarlyExit;
