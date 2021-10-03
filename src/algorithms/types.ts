import GridGraphWithWeights from 'data-structures/grid/GridGraphWithWeights';
import GridLocation from 'data-structures/location/GridLocation';

export type CameFrom = Map<GridLocation, GridLocation | null>;

export interface PathFindingAlgorithm {
  key: string;
  label: string;

  /**
   * Execute algorithm
   */
  execute(
    graph: GridGraphWithWeights,
    start: GridLocation,
    goal: GridLocation,
    visitedCallback?: (location: GridLocation) => void,
  ): CameFrom;
}
