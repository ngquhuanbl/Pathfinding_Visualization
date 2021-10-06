import GridLocation from 'data-structures/location/GridLocation';
import Queue from 'data-structures/queue/Queue';

import { PathFindingAlgorithm } from './types';

const bfsEarlyExit: PathFindingAlgorithm = {
  key: 'BFS_EARLY_EXIT',
  label: 'BFS Early Exit',
  execute(graph, start, end, visitedCallback) {
    const frontier = new Queue<GridLocation>();
    const cameFrom = new Map<GridLocation, GridLocation | null>();

    frontier.enqueue(start);
    cameFrom.set(start, null);

    while (!frontier.isEmpty()) {
      const current = frontier.dequeue()!;

      if (visitedCallback) visitedCallback(current);

      if (current.equal(end)) break;

      graph.neighbors(current).forEach((next) => {
        if (!cameFrom.has(next)) {
          cameFrom.set(next, current);
          frontier.enqueue(next);
        }
      });
    }

    return cameFrom;
  },
};

export default bfsEarlyExit;