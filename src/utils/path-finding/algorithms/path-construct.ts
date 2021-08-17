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

import GridLocation from '../data-structures/GridLocation';

export const pathConstruct = (
  cameFrom: Map<GridLocation, GridLocation>,
  start: GridLocation,
  goal: GridLocation,
): GridLocation[] => {
  let current = cameFrom.get(goal);

  const res = [];

  while (current !== start) {
    res.push(current);
    current = cameFrom.get(current);
  }

  res.push(start);

  res.reverse();

  return res;
};
