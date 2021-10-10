import * as algorithms from 'utils/algorithms';
import { CameFrom } from 'utils/algorithms/types';
import GridLocation from 'utils/data-structures/location/GridLocation';

export type AlgorithmKey = 'BFS' | 'BFS_EARLY_EXIT' | 'DIJKSTRA' | 'A_STAR';

export type Algorithms = Record<
  AlgorithmKey,
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

export const ALGORITHMS: Algorithms = {
  BFS: {
    label: 'BFS',
    execute: algorithms.bfs,
  },
  BFS_EARLY_EXIT: {
    label: 'BFS Early Exit',
    execute: algorithms.bfsEarlyExit,
  },
  DIJKSTRA: {
    label: 'Dijkstra',
    execute: algorithms.dijkstra,
  },
  A_STAR: {
    label: 'A *',
    execute: algorithms.aStar,
  },
};
