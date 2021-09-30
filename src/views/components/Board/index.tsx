import { useState, useCallback } from 'react';

import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import update from 'immutability-helper';

import { bfs } from 'utils/path-finding/algorithms/bfs';
import { pathConstruct } from 'utils/path-finding/algorithms/path-construct';
import GridGraph from 'utils/path-finding/data-structures/GridGraph';
import GridLocation from 'utils/path-finding/data-structures/GridLocation';

import Cell from '../Cell';

const N_ROW = 20;
const N_COL = 50;

interface BoardItem {
  row: number;
  col: number;
  isVisited: boolean;
  isPathStep: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const Board = () => {
  const [startCol] = useState(15);
  const [startRow] = useState(10);
  const [endCol] = useState(35);
  const [endRow] = useState(10);
  const [boardData, setBoardData] = useState<BoardItem[][]>(() => {
    return Array.from({ length: N_ROW }, (_, rowIndex) =>
      Array.from({ length: N_COL }, (__, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        isVisited: false,
        isPathStep: false,
        isStart: startCol === colIndex && startRow === rowIndex,
        isEnd: endCol === colIndex && endRow === rowIndex,
      })),
    );
  });

  const animateAlgorithm = useCallback(
    (visitedInOrder: GridLocation[]): Promise<void> =>
      new Promise<void>((resolve) => {
        visitedInOrder.forEach(({ row: visitedRow, col: visitedCol }, index, array) => {
          setTimeout(() => {
            setBoardData((prevState) =>
              update(prevState, {
                [visitedRow]: { [visitedCol]: { isVisited: { $set: true } } },
              }),
            );
            if (index === array.length - 1) resolve();
          }, 20 * index);
        });
      }),
    [],
  );

  const animatePathConstruct = useCallback(
    (paths: GridLocation[]): Promise<void> =>
      new Promise<void>((resolve) => {
        paths.forEach(({ row, col }, index, array) => {
          setTimeout(() => {
            setBoardData((prevState) =>
              update(prevState, {
                [row]: { [col]: { isPathStep: { $set: true } } },
              }),
            );
            if (index === array.length - 1) resolve();
          }, 30 * index);
        });
      }),
    [],
  );

  const handleClick = async () => {
    const grid = new GridGraph(N_ROW, N_COL);
    const start = grid.cell(startRow, startCol);
    const end = grid.cell(endRow, endCol);
    const visitedInOrder: GridLocation[] = [];
    const cameFrom = bfs(grid, start!, (visitedLocation) => {
      visitedInOrder.push(visitedLocation);
    });
    await animateAlgorithm(visitedInOrder);
    const paths = pathConstruct(cameFrom, start!, end!);
    await animatePathConstruct(paths);
  };

  return (
    <Flex direction="column" alignItems="center">
      <HStack mb={8}>
        <Button colorScheme="blue" onClick={handleClick}>
          Virtualize BFS algorithm
        </Button>
        <Button colorScheme="green">Toggle color mode</Button>
      </HStack>
      <Box>
        {boardData.map((rowData, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={`row-${index}`}>
            {rowData.map(({ row, col, isVisited, isPathStep, isStart, isEnd }) => (
              <Cell
                key={`${row}-${col}`}
                isVisited={isVisited}
                isPathStep={isPathStep}
                isStart={isStart}
                isEnd={isEnd}
              />
            ))}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default Board;
