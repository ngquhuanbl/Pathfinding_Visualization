import GridLocation from 'data-structures/location/GridLocation';
import PriorityQueue from 'data-structures/queue/PriorityQueue';

import { PathFindingAlgorithm } from './types';

const heuristic = (a: GridLocation, b: GridLocation): number => {
  // Manhattan distance on a square grid
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

const aStar: PathFindingAlgorithm = {
  key: 'A_STAR',
  label: 'A *',
  execute(graph, start, end, visitedCallback) {
    const frontier = new PriorityQueue<GridLocation>();
    const cameFrom = new Map<GridLocation, GridLocation | null>();
    const costSoFar = new Map<GridLocation, number>();

    frontier.enqueue(start, 0);
    cameFrom.set(start, null);
    costSoFar.set(start, 0);

    while (!frontier.isEmpty()) {
      const current = frontier.dequeue()!;

      if (visitedCallback) visitedCallback(current);

      if (current.equal(end)) break;

      graph.neighbors(current).forEach((next) => {
        const newCost = costSoFar.get(current)! + graph.costs(current, next);
        if (!costSoFar.has(next) || newCost < costSoFar.get(next)!) {
          const priority = heuristic(next, end) + newCost;
          costSoFar.set(next, newCost);
          frontier.enqueue(next, priority);
          cameFrom.set(next, current);
        }
      });
    }

    return cameFrom;
  },
};

export default aStar;
