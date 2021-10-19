import update from 'immutability-helper';

import GridLocation from 'utils/data-structures/location/GridLocation';

const basicDesertRandom = (
  gridData: GridLocation[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): GridLocation[][] => {
  let res = gridData;

  const nRow = gridData.length;
  const nCol = gridData[0].length;

  for (let row = 0; row < nRow; row += 1) {
    for (let col = 0; col < nCol; col += 1) {
      if ((row !== startRow || col !== startCol) && (row !== endRow || col !== endCol)) {
        const isDesert = Math.random() < 0.35;
        if (isDesert) {
          res = update(res, {
            [row]: {
              [col]: {
                isDesert: { $set: isDesert },
              },
            },
          });
        }
      }
    }
  }
  return res;
};

export default basicDesertRandom;
