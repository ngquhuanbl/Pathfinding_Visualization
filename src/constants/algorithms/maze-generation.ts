import * as mazeGenerationAlgorithms from 'utils/algorithms/maze-generation';
import GridLocation from 'utils/data-structures/location/GridLocation';

export type MazeGenerationAlgorithmKey =
  | 'RECURSIVE_DIVISION_EQUAL'
  | 'RECURSIVE_DIVISION_NON_EQUAL'
  | 'BASIC_RANDOM_WALL'
  | 'BASIC_RANDOM_DESERT';

export type MazeGenerationAlgorithms = Record<
  MazeGenerationAlgorithmKey,
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
    ): GridLocation[][];
  }
>;

export const MAZE_GENERATION_ALGORITHMS: MazeGenerationAlgorithms = {
  RECURSIVE_DIVISION_EQUAL: {
    label: 'Recursive equal division',
    execute: mazeGenerationAlgorithms.recursiveDivisionEqual,
  },
  RECURSIVE_DIVISION_NON_EQUAL: {
    label: 'Recursive non-equal division',
    execute: mazeGenerationAlgorithms.recursiveDivisionNonEqual,
  },
  BASIC_RANDOM_WALL: {
    label: 'Basic wall random',
    execute: mazeGenerationAlgorithms.basicRandomWall,
  },
  BASIC_RANDOM_DESERT: {
    label: 'Basic desert random',
    execute: mazeGenerationAlgorithms.basicRandomDesert,
  },
};
