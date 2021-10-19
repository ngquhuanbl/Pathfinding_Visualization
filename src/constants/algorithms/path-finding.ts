import * as pathFindingAlgorithms from 'utils/algorithms/path-finding';
import { CameFrom } from 'utils/algorithms/path-finding/types';
import GridLocation from 'utils/data-structures/location/GridLocation';

export type PathFindingAlgorithmKey =
  | 'BFS'
  | 'EARLY_EXIT_BFS'
  | 'GREEDY_BEST_FIRST_SEARCH'
  | 'DIJKSTRA'
  | 'A_STAR';

export type PathFindingAlgorithms = Record<
  PathFindingAlgorithmKey,
  {
    label: string;

    /**
     * Execute algorithm
     */
    execute(
      gridData: GridLocation[][],
      startRow: number,
      startCol: number,
      endRow: number,
      endCol: number,
      visitedCallback?: (location: GridLocation) => void,
    ): CameFrom;
  }
>;

export const PATH_FINDING_ALGORITHMS: PathFindingAlgorithms = {
  BFS: {
    label: 'BFS',
    execute: pathFindingAlgorithms.bfs,
  },
  EARLY_EXIT_BFS: {
    label: 'Early Exit BFS',
    execute: pathFindingAlgorithms.bfsEarlyExit,
  },
  DIJKSTRA: {
    label: 'Dijkstra',
    execute: pathFindingAlgorithms.dijkstra,
  },
  GREEDY_BEST_FIRST_SEARCH: {
    label: 'Greedy Best First Search',
    execute: pathFindingAlgorithms.greedyBestFirstSearch,
  },
  A_STAR: {
    label: 'A *',
    execute: pathFindingAlgorithms.aStar,
  },
};
