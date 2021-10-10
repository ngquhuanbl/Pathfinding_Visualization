import GridLocation from 'utils/data-structures/location/GridLocation';
import PriorityQueue from 'utils/data-structures/queue/PriorityQueue';
import { getCost, getLocationNeighbors } from 'utils/grid';

import { CameFrom } from './types';

const dijkstra = (
  gridData: GridLocation[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  visitedCallback: (location: GridLocation) => void,
): CameFrom => {
  const frontier = new PriorityQueue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();
  const costSoFar = new Map<GridLocation, number>();

  const start = gridData[startRow][startCol];
  const end = gridData[endRow][endCol];

  frontier.enqueue(start, 0);
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (visitedCallback) visitedCallback(current);

    if (current.equal(end)) break;

    getLocationNeighbors(gridData, current).forEach((next) => {
      const newCost = costSoFar.get(current)! + getCost(current, next);
      if (!costSoFar.has(next) || newCost < costSoFar.get(next)!) {
        costSoFar.set(next, newCost);
        frontier.enqueue(next, newCost);
        cameFrom.set(next, current);
      }
    });
  }

  return cameFrom;
};

export default dijkstra;