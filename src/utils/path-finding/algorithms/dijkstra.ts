import GridGraphWithWeights from '../data-structures/GridGraphWithWeights';
import GridLocation from '../data-structures/GridLocation';
import PriorityQueue from '../data-structures/PriorityQueue';

export const dijkstra = (
  graph: GridGraphWithWeights,
  start: GridLocation,
  goal: GridLocation,
  visitedCallback?: (x: number, y: number) => void,
): Map<GridLocation, GridLocation | null> => {
  const frontier = new PriorityQueue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();
  const costSoFar = new Map<GridLocation, number>();

  frontier.enqueue(start, 0);
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (visitedCallback) visitedCallback(current.row, current.col);

    if (current.equal(goal)) break;

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
};
