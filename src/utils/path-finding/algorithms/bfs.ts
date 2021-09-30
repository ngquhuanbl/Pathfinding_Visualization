import GridGraph from '../data-structures/GridGraph';
import GridLocation from '../data-structures/GridLocation';
import Queue from '../data-structures/Queue';

export const bfs = (
  graph: GridGraph,
  start: GridLocation,
  visitedCallback?: (location: GridLocation) => void,
): Map<GridLocation, GridLocation | null> => {
  const frontier = new Queue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();

  frontier.enqueue(start);
  cameFrom.set(start, null);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (visitedCallback) visitedCallback(current);

    graph.neighbors(current).forEach((next) => {
      if (!cameFrom.has(next)) {
        cameFrom.set(next, current);
        frontier.enqueue(next);
      }
    });
  }

  return cameFrom;
};

export const bfsEarlyExit = (
  graph: GridGraph,
  start: GridLocation,
  goal: GridLocation,
  visitedCallback?: (x: number, y: number) => void,
): Map<GridLocation, GridLocation | null> => {
  const frontier = new Queue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation | null>();

  frontier.enqueue(start);
  cameFrom.set(start, null);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue()!;

    if (visitedCallback) visitedCallback(current.row, current.col);

    if (current.equal(goal)) break;

    graph.neighbors(current).forEach((next) => {
      if (!cameFrom.has(next)) {
        cameFrom.set(next, current);
        frontier.enqueue(next);
      }
    });
  }

  return cameFrom;
};
