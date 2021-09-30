import GridGraphWithWeights from '../data-structures/GridGraphWithWeights';
import GridLocation from '../data-structures/GridLocation';
import PriorityQueue from '../data-structures/PriorityQueue';

const heuristic = (a: GridLocation, b: GridLocation): number => {
  // Manhattan distance on a square grid
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

export const aStar = (
  graph: GridGraphWithWeights,
  start: GridLocation,
  goal: GridLocation,
): Map<GridLocation, GridLocation | null> => {
  const frontier = new PriorityQueue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();
  const costSoFar = new Map<GridLocation, number>();

  frontier.enqueue(start, 0);
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (current.equal(goal)) break;

    graph.neighbors(current).forEach((next) => {
      const newCost = costSoFar.get(current)! + graph.costs(current, next);
      if (!costSoFar.has(next) || newCost < costSoFar.get(next)!) {
        const priority = heuristic(current, next) + newCost;
        costSoFar.set(next, newCost);
        frontier.enqueue(next, priority);
        cameFrom.set(next, current);
      }
    });
  }

  return cameFrom;
};