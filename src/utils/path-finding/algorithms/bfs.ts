import GridGraph from '../data-structures/GridGraph';
import GridLocation from '../data-structures/GridLocation';
import Queue from '../data-structures/Queue';

export const bfs = (graph: GridGraph, start: GridLocation): Map<GridLocation, GridLocation> => {
  const frontier = new Queue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation>();

  frontier.enqueue(start);
  cameFrom.set(start, null);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue();

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
): Map<GridLocation, GridLocation> => {
  const frontier = new Queue<GridLocation>();
  const cameFrom = new Map<GridLocation, GridLocation>();

  frontier.enqueue(start);
  cameFrom.set(start, null);

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue();

    if (current === goal) break;

    graph.neighbors(current).forEach((next) => {
      if (!cameFrom.has(next)) {
        cameFrom.set(next, current);
        frontier.enqueue(next);
      }
    });
  }

  return cameFrom;
};
