/* eslint-disable no-shadow */
import update from 'immutability-helper';

import GridLocation from 'utils/data-structures/location/GridLocation';

const recursiveDivisionEqual = (
  gridData: GridLocation[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): GridLocation[][] => {
  const recursiveFunc = (
    gridData: GridLocation[][],
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    minRow: number,
    minCol: number,
    maxRow: number,
    maxCol: number,
  ): GridLocation[][] => {
    /**
     * Every chamber has a width of one cell in either of the two directions
     */
    if (maxRow - minRow <= 1 || maxCol - minCol <= 1) return gridData;

    let res = gridData;

    /**
     * Divide the large chamber into four smaller chambers separated by four walls
     */
    let horizontalDivisionRowIndex = Math.round(0.5 * (maxRow - minRow)) + minRow;
    if (horizontalDivisionRowIndex === minRow) horizontalDivisionRowIndex += 1;
    let verticalDivisionColIndex = Math.round(0.5 * (maxCol - minCol)) + minCol;
    if (verticalDivisionColIndex === minCol) verticalDivisionColIndex += 1;

    /**
     * Create column division (aka vertical division)
     */
    for (let row = minRow; row <= maxRow; row += 1) {
      if (
        /**
         * It's possible for the division wall to cover holes of other subchambers
         * Such scenario will potentially cause our maze to be unsolvable.
         * Therefore, if any head of the division contacts directly with an hole,
         * we will let such head to be free of wall,
         * hence the hole won't be covered
         */
        (row !== minRow || minRow === 0 || res[row - 1][verticalDivisionColIndex].isWall) &&
        (row !== maxRow ||
          maxRow === gridData.length - 1 ||
          res[row + 1][verticalDivisionColIndex].isWall) &&
        /**
         * Skip the start/end location when creating division wall
         * since they can't be wall locations
         */
        (row !== startRow || verticalDivisionColIndex !== startCol) &&
        (row !== endRow || verticalDivisionColIndex !== endCol)
      ) {
        res = update(res, {
          [row]: {
            [verticalDivisionColIndex]: {
              isWall: { $set: true },
            },
          },
        });
      }
    }

    /**
     * Create row division (aka horizontal division)
     */
    for (let col = minCol; col <= maxCol; col += 1) {
      if (
        /**
         * It's possible for the division wall to cover opened holes of other subchambers
         * Such scenario will potentially cause our maze to be unsolvable.
         * Therefore, if any head of the division contacts directly with an opened hole,
         * we will let such head to be free of wall,
         * hence the hole won't be covered
         */
        (col !== minCol || minCol === 0 || res[horizontalDivisionRowIndex][col - 1].isWall) &&
        (col !== maxCol ||
          maxCol === gridData[0].length - 1 ||
          res[horizontalDivisionRowIndex][col + 1].isWall) &&
        /**
         * Skip the start/end location when creating division wall
         * since they can't be wall locations
         */
        (horizontalDivisionRowIndex !== startRow || col !== startCol) &&
        (horizontalDivisionRowIndex !== endRow || col !== endCol)
      )
        res = update(res, {
          [horizontalDivisionRowIndex]: {
            [col]: {
              isWall: { $set: true },
            },
          },
        });
    }

    /**
     * Choose three of the four sub division walls at random, and open a one cell-wide hole at a random point in each of the three
     *   - - - - -
     *   |   0   |
     *   | 1 * 3 |
     *   |   2   |
     *   - - - - -
     */

    // Choose three of the four sub division walls at random
    const nonHoleSubDivisionWall = Math.round(Math.random() * 3);

    const subDivisionWallsDescription: Array<{
      min: number;
      max: number;
      isVerticalWall: boolean;
    }> = [
      { min: minRow, max: horizontalDivisionRowIndex - 1, isVerticalWall: true },
      { min: minCol, max: verticalDivisionColIndex - 1, isVerticalWall: false },
      { min: horizontalDivisionRowIndex + 1, max: maxRow, isVerticalWall: true },
      { min: verticalDivisionColIndex + 1, max: maxCol, isVerticalWall: false },
    ];

    subDivisionWallsDescription.forEach(({ min, max, isVerticalWall }, index) => {
      if (index === nonHoleSubDivisionWall) return;
      if (min > max) return;

      const randomHolePosition = Math.round(Math.random() * (max - min)) + min;

      let row = -1;
      let col = -1;

      if (isVerticalWall) {
        row = randomHolePosition;
        col = verticalDivisionColIndex;
      } else {
        row = horizontalDivisionRowIndex;
        col = randomHolePosition;
      }

      // Open a one cell-wide hole at a random point
      res = update(res, {
        [row]: {
          [col]: {
            isWall: { $set: false },
          },
        },
      });
    });

    /**
     * Recursively repeat the process on the subchambers
     *   - - - - -
     *   | 0 * 3 |
     *   | * * * |
     *   | 1 * 2 |
     *   - - - - -
     */
    // Subchamber 0
    res = recursiveFunc(
      res,
      startRow,
      startCol,
      endRow,
      endCol,
      minRow,
      minCol,
      horizontalDivisionRowIndex - 1,
      verticalDivisionColIndex - 1,
    );
    // Subchamber 1
    res = recursiveFunc(
      res,
      startRow,
      startCol,
      endRow,
      endCol,
      horizontalDivisionRowIndex + 1,
      minCol,
      maxRow,
      verticalDivisionColIndex - 1,
    );
    // Subchamber 2
    res = recursiveFunc(
      res,
      startRow,
      startCol,
      endRow,
      endCol,
      horizontalDivisionRowIndex + 1,
      verticalDivisionColIndex + 1,
      maxRow,
      maxCol,
    );
    // Subchamber 3
    res = recursiveFunc(
      res,
      startRow,
      startCol,
      endRow,
      endCol,
      minRow,
      verticalDivisionColIndex + 1,
      horizontalDivisionRowIndex - 1,
      maxCol,
    );
    return res;
  };

  return recursiveFunc(
    gridData,
    startRow,
    startCol,
    endRow,
    endCol,
    0,
    0,
    gridData.length - 1,
    gridData[0].length - 1,
  );
};

export default recursiveDivisionEqual;
