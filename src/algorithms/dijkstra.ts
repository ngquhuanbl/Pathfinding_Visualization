import GridLocation from 'data-structures/location/GridLocation';
import PriorityQueue from 'data-structures/queue/PriorityQueue';

import { PathFindingAlgorithm } from './types';

const dijkstra: PathFindingAlgorithm = {
  key: 'DIJKSTRA',
  label: 'Dijkstra',
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
          costSoFar.set(next, newCost);
          frontier.enqueue(next, newCost);
          cameFrom.set(next, current);
        }
      });
    }

    return cameFrom;
  },
};

export default dijkstra;
