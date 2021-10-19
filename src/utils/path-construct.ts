/*
 * *****************************************************
 * Copyright (C) BoostCommerce.net
 *
 * This file is part of commerical BoostCommerce.net projects.
 *
 * This file can not be copied and/or distributed without the express
 * permission of BoostCommerce.net
 *
 * @Date:   Tue, Aug 17th 2021, 9:00:23 pm
 *
 * *****************************************************
 */

import GridLocation from './data-structures/location/GridLocation';

export const pathConstruct = (
  cameFrom: Map<GridLocation, GridLocation | null>,
  gridData: GridLocation[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): GridLocation[] => {
  const start = gridData[startRow][startCol];
  const end = gridData[endRow][endCol];

  let current = cameFrom.get(end);

  if (!current) return [];

  const res: GridLocation[] = [end];

  while (current && !current.equal(start)) {
    res.push(current);
    current = cameFrom.get(current);
  }

  res.push(start);

  res.reverse();

  return res;
};
