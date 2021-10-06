import Location from 'data-structures/location/Location';

abstract class Graph {
  abstract isInBound(location: Location): boolean;

  abstract isPassable(location: Location): boolean;

  abstract neighbors(location: Location): Location[];
}

export default Graph;
