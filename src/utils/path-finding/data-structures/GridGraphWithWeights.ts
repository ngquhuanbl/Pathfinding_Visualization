import GridGraph from './GridGraph';
import GridLocation from './GridLocation';

class GridGraphWithWeights extends GridGraph {
  forest: Set<GridLocation>;

  constructor(width: number, height: number) {
    super(width, height);
    this.forest = new Set();
  }

  costs(fromNode: GridLocation, toNode: GridLocation): number {
    return this.forest.has(toNode) ? 5 : 1;
  }
}

export default GridGraphWithWeights;
