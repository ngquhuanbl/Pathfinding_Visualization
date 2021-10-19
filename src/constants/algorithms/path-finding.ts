import * as pathFindingAlgorithms from 'utils/algorithms/path-finding';
import { CameFrom } from 'utils/algorithms/path-finding/types';
import GridLocation from 'utils/data-structures/location/GridLocation';

export type PathFindingAlgorithmKey = 'BFS' | 'BFS_EARLY_EXIT' | 'DIJKSTRA' | 'A_STAR';

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
  BFS_EARLY_EXIT: {
    label: 'BFS Early Exit',
    execute: pathFindingAlgorithms.bfsEarlyExit,
  },
  DIJKSTRA: {
    label: 'Dijkstra',
    execute: pathFindingAlgorithms.dijkstra,
  },
  A_STAR: {
    label: 'A *',
    execute: pathFindingAlgorithms.aStar,
  },
};
