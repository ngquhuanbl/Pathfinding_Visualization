import GridLocation from 'data-structures/location/GridLocation';

import GridGraph from './GridGraph';

class GridGraphWithWeights extends GridGraph {
  forest: Set<GridLocation>;

  constructor(nRow: number, nCol: number, data?: GridLocation[][]) {
    super(nRow, nCol, data);
    this.forest = new Set();
  }

  costs(fromNode: GridLocation, toNode: GridLocation): number {
    return this.forest.has(toNode) ? 5 : 1;
  }
}

export default GridGraphWithWeights;
