import { SyntheticEvent, useCallback } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import GridLocation from 'utils/data-structures/location/GridLocation';

import Cell from './Cell';

interface Props {
  isVirtualizing: boolean;
  data: GridLocation[][];
  onMouseDownOnCell: (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
    isDesert: boolean,
  ) => void;
  onMouseEnterOnCell: (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
    isForest: boolean,
  ) => void;
  onMouseUpOnCell: () => void;
}

const Grid = ({
  isVirtualizing,
  data,
  onMouseDownOnCell,
  onMouseEnterOnCell,
  onMouseUpOnCell,
}: Props): JSX.Element => {
  const handleMouseDownOnTheContainerOfAllCells = useCallback(
    (event: SyntheticEvent) => {
      /**
       * If the visualization process is running,
       * prevent all attached events of all cells from happening
       * by stop the further propagation of the mouse events
       */
      if (isVirtualizing) event.stopPropagation();
    },
    [isVirtualizing],
  );
  return (
    <Box
      cursor={isVirtualizing ? 'not-allowed' : ''}
      onMouseDownCapture={handleMouseDownOnTheContainerOfAllCells}
    >
      {data.map((rowData, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Flex key={`row-${index}`}>
          {rowData.map(
            ({
              row,
              col,
              isVisited,
              isPathStep,
              isStart,
              isEnd,
              isWall,
              isDesert,
              noAnimation,
            }) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                isVisited={isVisited}
                isPathStep={isPathStep}
                isStart={isStart}
                isEnd={isEnd}
                isDesert={isDesert}
                isWall={isWall}
                noAnimation={noAnimation}
                onMouseDown={onMouseDownOnCell}
                onMouseEnter={onMouseEnterOnCell}
                onMouseUp={onMouseUpOnCell}
              />
            ),
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default Grid;
