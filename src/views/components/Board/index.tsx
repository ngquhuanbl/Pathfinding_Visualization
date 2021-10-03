import { useState, useCallback, useRef, useMemo } from 'react';

import { Box, Button, Flex, HStack, Select } from '@chakra-ui/react';
import update from 'immutability-helper';

import * as algorithms from 'algorithms';
import { PathFindingAlgorithm } from 'algorithms/types';
import GridGraphWithWeights from 'data-structures/grid/GridGraphWithWeights';
import BoardLocation from 'data-structures/location/BoardLocation';
import GridLocation from 'data-structures/location/GridLocation';
import { pathConstruct } from 'utils/path-construct';

import Cell from '../Cell';

const N_ROW = 20;
const N_COL = 50;
const INITIAL_START_ROW = 10;
const INITIAL_START_COL = 15;
const INITIAL_END_ROW = 10;
const INITIAL_END_COL = 35;

const MODIFYING_WALL_ADD_MODE = 'ADD_WALL';
const MODIFYING_WALL_REMOVE_MODE = 'REMOVE_WALL';

type ModifyingWallMode = typeof MODIFYING_WALL_ADD_MODE | typeof MODIFYING_WALL_REMOVE_MODE;

const Board = () => {
  const [boardData, setBoardData] = useState<BoardLocation[][]>(() => {
    return Array.from({ length: N_ROW }, (_, row) =>
      Array.from({ length: N_COL }, (__, col) => {
        const isVisited = false;
        const isPathStep = false;
        const isStart = row === INITIAL_START_ROW && col === INITIAL_START_COL;
        const isEnd = row === INITIAL_END_ROW && col === INITIAL_END_COL;
        const isWall = false;
        return new BoardLocation(row, col, isVisited, isPathStep, isStart, isEnd, isWall);
      }),
    );
  });
  const noVirtualizedBoardData = useRef<BoardLocation[][]>(boardData);
  const grid = useRef<GridGraphWithWeights>(new GridGraphWithWeights(N_ROW, N_COL, boardData));
  const [startLocation /* , setStartLocation */] = useState(
    grid.current.cell(INITIAL_START_ROW, INITIAL_START_COL)!,
  );
  const [endLocation /* , setEndLocation */] = useState(
    grid.current.cell(INITIAL_END_ROW, INITIAL_END_COL)!,
  );
  const timerIds = useRef<any[]>([]);
  const options = useMemo(
    () => Object.entries(algorithms).map(([value, { label }]) => ({ value, label })),
    [],
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(options[0].value);
  const [isModifyingWall, setIsModifyingWall] = useState(false);
  const [modifyingWallMode, setModifyingWallMode] =
    useState<ModifyingWallMode>(MODIFYING_WALL_ADD_MODE);

  // const handleChangeStartLocation = useCallback((newStartRow, newStartCol) => {
  //   setStartLocation((oldStartLocation) => {
  //     const { row: oldStartRow, col: oldStartCol } = oldStartLocation;
  //     setBoardData((oldBoardData) =>
  //       update(oldBoardData, {
  //         [oldStartRow]: { [oldStartCol]: { isStart: { $set: false } } },
  //         [newStartRow]: { [newStartCol]: { isStart: { $set: true } } },
  //       }),
  //     );
  //     return grid.current.cell(newStartRow, newStartCol)!;
  //   });
  // }, []);

  // const handleChangeEndLocation = useCallback((newEndRow, newEndCol) => {
  //   setEndLocation((oldEndLocation) => {
  //     const { row: oldEndRow, col: oldEndCol } = oldEndLocation;
  //     setBoardData((oldBoardData) =>
  //       update(oldBoardData, {
  //         [oldEndRow]: { [oldEndCol]: { isEnd: { $set: false } } },
  //         [newEndRow]: { [newEndCol]: { isEnd: { $set: true } } },
  //       }),
  //     );
  //     return grid.current.cell(newEndRow, newEndCol)!;
  //   });
  // }, []);

  const handleModifyWall = useCallback(
    (modifyingWallModeValue: ModifyingWallMode, wallRow: number, wallCol: number) => {
      const wallLocation = grid.current.cell(wallRow, wallCol)!;

      const isWall = modifyingWallModeValue === MODIFYING_WALL_ADD_MODE;

      if (modifyingWallModeValue) grid.current.walls.add(wallLocation);
      else grid.current.walls.delete(wallLocation);

      setBoardData((oldBoardData) => {
        const newBoardData = update(oldBoardData, {
          [wallRow]: { [wallCol]: { isWall: { $set: isWall } } },
        });
        noVirtualizedBoardData.current = newBoardData;
        return newBoardData;
      });
    },
    [],
  );

  const handleMouseDown = useCallback(
    (wallRow, wallCol) => {
      setIsModifyingWall(true);
      const wallLocation = grid.current.cell(wallRow, wallCol)!;
      const isWall = !grid.current.isPassable(wallLocation);
      const newModifyingWallMode = isWall ? MODIFYING_WALL_REMOVE_MODE : MODIFYING_WALL_ADD_MODE;
      setModifyingWallMode(newModifyingWallMode);
      handleModifyWall(newModifyingWallMode, wallRow, wallCol);
    },
    [handleModifyWall],
  );

  const handleMouseEnter = useCallback(
    (wallRow: number, wallCol: number) => {
      if (isModifyingWall) {
        handleModifyWall(modifyingWallMode, wallRow, wallCol);
      }
    },
    [handleModifyWall, modifyingWallMode, isModifyingWall],
  );

  const handleMouseUp = useCallback(() => {
    setIsModifyingWall(false);
  }, []);

  /**
   * Animate path-finding algorithm
   */
  const animateAlgorithm = useCallback(
    (visitedInOrder: GridLocation[]): Promise<void> =>
      new Promise<void>((resolve) => {
        visitedInOrder.forEach(({ row: visitedRow, col: visitedCol }, index, array) => {
          const timerId = setTimeout(() => {
            setBoardData((prevState) =>
              update(prevState, {
                [visitedRow]: { [visitedCol]: { isVisited: { $set: true } } },
              }),
            );
            if (index === array.length - 1) resolve();
          }, 20 * index);
          timerIds.current.push(timerId);
        });
      }),
    [],
  );

  /**
   * Animate path constructing
   */
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

  const handleClearBoard = useCallback(() => {
    setBoardData(noVirtualizedBoardData.current);
    // Clear enqueued timeout events
    timerIds.current.forEach((timerId) => clearTimeout(timerId));
    timerIds.current = [];
  }, [noVirtualizedBoardData]);

  const handleVirtualize = async () => {
    handleClearBoard();

    const visitedInOrder: GridLocation[] = [];
    const algorithmFunc = ((algorithms as any)[selectedAlgorithm] as PathFindingAlgorithm).execute;
    const cameFrom = algorithmFunc(grid.current, startLocation, endLocation, (visitedLocation) => {
      visitedInOrder.push(visitedLocation);
    });
    await animateAlgorithm(visitedInOrder);
    const paths = pathConstruct(cameFrom, startLocation, endLocation);
    await animatePathConstruct(paths);
  };

  const handleSelectChange = useCallback((e) => {
    setSelectedAlgorithm(e.currentTarget.value);
  }, []);

  return (
    <Flex direction="column" alignItems="center">
      <HStack mb={8}>
        <Select w={60} value={selectedAlgorithm} onChange={handleSelectChange}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Button colorScheme="blue" onClick={handleVirtualize}>
          Virtualize algorithm
        </Button>
        <Button colorScheme="red" onClick={handleClearBoard}>
          Clear board
        </Button>
      </HStack>
      <Box>
        {boardData.map((rowData, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={`row-${index}`}>
            {rowData.map(({ row, col, isVisited, isPathStep, isStart, isEnd, isWall }) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                isVisited={isVisited}
                isPathStep={isPathStep}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default Board;
