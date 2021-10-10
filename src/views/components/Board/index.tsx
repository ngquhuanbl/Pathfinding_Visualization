import { useState, useCallback, useRef, useMemo } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Select, Text } from '@chakra-ui/react';
import merge from 'deepmerge';
import update from 'immutability-helper';

import { ALGORITHMS, AlgorithmKey } from 'constants/algorithms';
import {
  INITIAL_END_COL,
  INITIAL_END_ROW,
  INITIAL_START_COL,
  INITIAL_START_ROW,
  N_COL,
  N_ROW,
} from 'constants/grid';
import GridLocation from 'utils/data-structures/location/GridLocation';
import { pathConstruct } from 'utils/path-construct';
import Cell from 'views/components/Cell';

export type DrawingAction = 'DRAWING_ACTION_ADD_ITEM' | 'DRAWING_ACTION_REMOVE_ITEM';
export type DrawingItem = 'DRAWING_ITEM_WALL' | 'DRAWING_ITEM_DESERT';

const Grid = () => {
  /**
   * gridData: The state of the grid's UI at a particular point of time
   * It is usable by ReactJS to render the desired UI
   */
  const [gridData, setGridData] = useState<GridLocation[][]>(
    Array.from({ length: N_ROW }, (_, row) =>
      Array.from({ length: N_COL }, (__, col) => {
        const isWall = false;
        const isDesert = false;
        const isVisited = false;
        const isPathStep = false;
        const isStart = row === INITIAL_START_ROW && col === INITIAL_START_COL;
        const isEnd = row === INITIAL_END_ROW && col === INITIAL_END_COL;
        return new GridLocation(row, col, isWall, isDesert, isVisited, isPathStep, isStart, isEnd);
      }),
    ),
  );

  /**
   * startLocation: The starting grid location
   */
  const [startRow, setStartRow] = useState(INITIAL_START_ROW);
  const [startCol, setStartCol] = useState(INITIAL_START_COL);
  /**
   * eNdLocation: The ending grid location
   */
  const [endRow, setEndRow] = useState(INITIAL_END_ROW);
  const [endCol, setEndCol] = useState(INITIAL_END_COL);

  /**
   * isVirtualizing: A boolean state indicating if the virtualization process is running
   */
  const [isVirtualizing, setIsVirtualizing] = useState(false);
  /**
   * isChangingStartLocation: A boolean state indicating if user is dragging the start location to a new location
   */
  const [isChangingStartLocation, setIsChangingStartLocation] = useState(false);
  /**
   * isChangingStartLocation: A boolean state indicating if user is dragging the start location to a new location
   */
  const [isChangingEndLocation, setIsChangingEndLocation] = useState(false);

  /**
   * The virtualization process uses setTimeout to schedule UI state update
   * By keep track of scheduled timer IDs,
   * we will be able to clear all enqueued but not yet executed timers,
   * and stop the virtualization process completely when needed.
   */
  const timerIds = useRef<any[]>([]);

  /**
   * A list of algorithm options
   */
  const algorithmOptions = useMemo(() => {
    return Object.entries(ALGORITHMS).map(([value, { label }]) => ({
      label,
      value,
    }));
  }, []);

  /**
   * selectedAlgorithm: Selected path-finding algorithm
   */
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('BFS');

  const handleSelectAlgorithm = useCallback((e) => {
    setSelectedAlgorithm(e.currentTarget.value);
  }, []);

  /**
   * isDrawing: A boolean state indicating if user is drawing.
   * The drawing result will be wall or desert depending on the selected drawing item.
   */
  const [isDrawing, setIsDrawing] = useState(false);
  /**
   * currentDrawingAction: Current drawing action
   */
  const [currentDrawingAction, setCurrentDrawingAction] =
    useState<DrawingAction>('DRAWING_ACTION_ADD_ITEM');
  /**
   * selectedAlgorithm: Selected path-finding algorithm
   */
  const [selectedDrawingItem, setSelectedDrawingItem] = useState<DrawingItem>('DRAWING_ITEM_WALL');

  const handleSelectDrawingItem = useCallback((e) => {
    setSelectedDrawingItem(e.currentTarget.value);
  }, []);

  const handleStartLocationChange = useCallback(
    (
      newStartRow: number,
      newStartCol: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
    ) => {
      if (!isStart && !isEnd && !isWall)
        setStartRow((oldStartRow) => {
          setStartCol((oldStartCol) => {
            setGridData((oldGridData) =>
              update(
                oldGridData,
                merge(
                  {
                    [oldStartRow]: { [oldStartCol]: { isStart: { $set: false } } },
                  },
                  { [newStartRow]: { [newStartCol]: { isStart: { $set: true } } } },
                ),
              ),
            );
            return newStartCol;
          });
          return newStartRow;
        });
    },
    [],
  );

  const handleEndLocationChange = useCallback(
    (newEndRow: number, newEndCol: number, isStart: boolean, isEnd: boolean, isWall: boolean) => {
      if (!isStart && !isEnd && !isWall)
        setEndRow((oldEndRow) => {
          setEndCol((oldEndCol) => {
            setGridData((oldGridData) =>
              update(
                oldGridData,
                merge(
                  {
                    [oldEndRow]: { [oldEndCol]: { isEnd: { $set: false } } },
                  },
                  { [newEndRow]: { [newEndCol]: { isEnd: { $set: true } } } },
                ),
              ),
            );
            return newEndCol;
          });
          return newEndRow;
        });
    },
    [],
  );

  const handleDrawing = useCallback(
    (
      row: number,
      col: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
      isDesert: boolean,
      drawingAction: DrawingAction,
    ) => {
      if (!isStart && !isEnd) {
        if (selectedDrawingItem === 'DRAWING_ITEM_WALL' && isDesert) return;
        if (selectedDrawingItem === 'DRAWING_ITEM_DESERT' && isWall) return;

        const value = drawingAction === 'DRAWING_ACTION_ADD_ITEM';
        const updatedKey = selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'isWall' : 'isDesert';

        setGridData((oldGridData) => {
          let newGridData = oldGridData;
          if (value)
            newGridData = update(oldGridData, {
              [row]: {
                [col]: {
                  [updatedKey]: { $set: value },
                  isVisited: { $set: false },
                  isPathStep: { $set: false },
                },
              },
            });
          else
            newGridData = update(oldGridData, {
              [row]: {
                [col]: {
                  [updatedKey]: { $set: value },
                },
              },
            });
          return newGridData;
        });
      }
    },
    [selectedDrawingItem],
  );

  // TODO: Improve method dependencies
  const handleMouseDown = useCallback(
    (
      row: number,
      col: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
      isDesert: boolean,
    ) => {
      if (!isVirtualizing) {
        if (isStart) {
          setIsChangingStartLocation(true);
        } else if (isEnd) {
          setIsChangingEndLocation(true);
        } else {
          setIsDrawing(true);
          let drawingAction: DrawingAction = isWall
            ? 'DRAWING_ACTION_REMOVE_ITEM'
            : 'DRAWING_ACTION_ADD_ITEM';
          if (selectedDrawingItem === 'DRAWING_ITEM_DESERT') {
            drawingAction = isDesert ? 'DRAWING_ACTION_REMOVE_ITEM' : 'DRAWING_ACTION_ADD_ITEM';
          }
          setCurrentDrawingAction(drawingAction);
          handleDrawing(row, col, isStart, isEnd, isWall, isDesert, drawingAction);
        }
      }
    },
    [isVirtualizing, handleDrawing, selectedDrawingItem],
  );

  // TODO: Improve method dependencies
  const handleMouseEnter = useCallback(
    (
      row: number,
      col: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
      isForest: boolean,
    ) => {
      if (isChangingStartLocation) {
        handleStartLocationChange(row, col, isStart, isEnd, isWall);
      } else if (isChangingEndLocation) {
        handleEndLocationChange(row, col, isStart, isEnd, isWall);
      } else if (isDrawing) {
        handleDrawing(row, col, isStart, isEnd, isWall, isForest, currentDrawingAction);
      }
    },
    [
      isChangingStartLocation,
      isChangingEndLocation,
      isDrawing,
      handleStartLocationChange,
      handleEndLocationChange,
      handleDrawing,
      currentDrawingAction,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsChangingStartLocation(false);
    setIsChangingEndLocation(false);
    setIsDrawing(false);
  }, []);

  /**
   * Animate path-finding algorithm
   */
  const animateAlgorithm = useCallback(
    (visitedInOrder: GridLocation[]): Promise<void> =>
      new Promise<void>((resolve) => {
        visitedInOrder.forEach(({ row: visitedRow, col: visitedCol }, index, array) => {
          const timerId = setTimeout(() => {
            setGridData((prevState) =>
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
  const animatePathConstruct = useCallback((paths: GridLocation[]): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (paths.length === 0) resolve();

      paths.forEach(({ row, col }, index, array) => {
        setTimeout(() => {
          setGridData((prevState) =>
            update(prevState, {
              [row]: { [col]: { isPathStep: { $set: true } } },
            }),
          );
          if (index === array.length - 1) resolve();
        }, 30 * index);
      });
    });
  }, []);

  /**
   * Clear only virtualized data
   */
  const handleClearVirtualizedData = useCallback(() => {
    setGridData((oldGridData) =>
      oldGridData.map((rowData) =>
        rowData.map(
          ({ row, col, isWall, isDesert, isStart, isEnd }) =>
            new GridLocation(row, col, isWall, isDesert, false, false, isStart, isEnd),
        ),
      ),
    );

    // Clear enqueued timeout events (if there's any)
    if (timerIds.current.length !== 0) {
      timerIds.current.forEach((timerId) => clearTimeout(timerId));
      timerIds.current = [];
    }

    setIsVirtualizing(false);
  }, []);

  /**
   * Clear all (virtualized data + walls)
   */
  const handleClearAll = useCallback(() => {
    setGridData((oldGridData) =>
      oldGridData.map((rowData) =>
        rowData.map(
          ({ row, col, isStart, isEnd }) =>
            new GridLocation(row, col, false, false, false, false, isStart, isEnd),
        ),
      ),
    );

    // Clear enqueued timeout events
    if (timerIds.current.length !== 0) {
      timerIds.current.forEach((timerId) => clearTimeout(timerId));
      timerIds.current = [];
    }

    setIsVirtualizing(false);
  }, []);

  const handleVirtualize = async () => {
    handleClearVirtualizedData();

    setIsVirtualizing(true);

    const visitedInOrder: GridLocation[] = [];
    const algorithmFunc = ALGORITHMS[selectedAlgorithm].execute;
    const cameFrom = algorithmFunc(
      gridData,
      startRow,
      startCol,
      endRow,
      endCol,
      (visitedLocation) => {
        visitedInOrder.push(visitedLocation);
      },
    );
    await animateAlgorithm(visitedInOrder);
    const paths = pathConstruct(cameFrom, gridData, startRow, startCol, endRow, endCol);
    await animatePathConstruct(paths);

    setIsVirtualizing(false);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Flex mb={6} w="full" alignItems="center">
        <Text mr={2} fontWeight="600">
          Algorithm:
        </Text>
        <Select
          w={60}
          value={selectedAlgorithm}
          disabled={isVirtualizing}
          onChange={handleSelectAlgorithm}
        >
          {algorithmOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Button
          ml="4"
          mr="4"
          colorScheme="gray"
          onClick={handleVirtualize}
          disabled={isVirtualizing}
          isLoading={isVirtualizing}
          loadingText="Virtualizing ..."
        >
          Virtualize algorithm
        </Button>
        <Button
          ml="auto"
          leftIcon={<DeleteIcon />}
          colorScheme="purple"
          onClick={handleClearVirtualizedData}
        >
          Clear virtualized data
        </Button>
        <Button ml="4" leftIcon={<DeleteIcon />} colorScheme="red" onClick={handleClearAll}>
          Clear virtualized data + walls + desert
        </Button>
      </Flex>
      <Box cursor={isVirtualizing ? 'not-allowed' : ''}>
        {gridData.map((rowData, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={`row-${index}`}>
            {rowData.map(
              ({ row, col, isVisited, isPathStep, isStart, isEnd, isWall, isDesert }) => (
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
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              ),
            )}
          </Flex>
        ))}
      </Box>
      <Flex mt={6} w="full" alignItems="center">
        <Text mr={2} fontWeight="600">
          Drawing item:
        </Text>
        <Select
          w={60}
          value={selectedDrawingItem}
          disabled={isVirtualizing}
          onChange={handleSelectDrawingItem}
        >
          <option value="DRAWING_ITEM_WALL">Wall</option>
          <option value="DRAWING_ITEM_DESERT">Desert</option>
        </Select>
        <Box
          ml={2}
          w={4}
          h={4}
          bgColor={selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'gray.800' : 'orange.400'}
        />
      </Flex>
    </Flex>
  );
};

export default Grid;
