import { useState, useCallback, useRef, useMemo, useEffect, SyntheticEvent } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Select, Spacer, Text } from '@chakra-ui/react';
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
import Legends from 'views/components/Legends';

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
   * isVirtualizationDone: A boolean state indicating if the virtualization process is done
   */
  const [isVirtualizationDone, setIsVirtualizationDone] = useState(false);
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

  /**
   * Update start location
   */
  const handleChangeStartLocation = useCallback(
    (
      newStartRow: number,
      newStartCol: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
    ) => {
      /**
       * A new location for start
       * must not be ones that has already been occupied by a wall or the end location
       */
      if (!isEnd && !isWall)
        setStartRow((oldStartRow) => {
          setStartCol((oldStartCol) => {
            setGridData((oldGridData) =>
              update(
                oldGridData,
                /**
                 * Use deep merge to create update object config
                 * Normal object destructuring will potentially overide properties
                 * since it's possible for oldStartRow and newStartRow to share the same value
                 * (such scenario can also happen to oldStartCol and newStartCol)
                 */
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

  /**
   * Update end location
   */
  const handleChangeEndLocation = useCallback(
    (newEndRow: number, newEndCol: number, isStart: boolean, isEnd: boolean, isWall: boolean) => {
      /**
       * A new location for start
       * must not be ones that has already been occupied by a wall or the start location
       */
      if (!isStart && !isWall)
        setEndRow((oldEndRow) => {
          setEndCol((oldEndCol) => {
            setGridData((oldGridData) =>
              update(
                oldGridData,
                /**
                 * Use deep merge to create update object config
                 * Normal object destructuring will potentially overide properties
                 * since it's possible for oldStartRow and newStartRow to share the same value
                 * (such scenario can also happen to oldStartCol and newStartCol)
                 */
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

  /**
   * User can perform drawing action on the grid to create/remove a wall or a desert area
   */
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
      /**
       * Prevent user to draw onto the start and end location
       */
      if (!isStart && !isEnd) {
        /**
         * Prevent user to draw a wall on a desert location
         */
        if (selectedDrawingItem === 'DRAWING_ITEM_WALL' && isDesert) return;
        /**
         * Prevent user to draw a desert area on a wall location
         */
        if (selectedDrawingItem === 'DRAWING_ITEM_DESERT' && isWall) return;

        const value = drawingAction === 'DRAWING_ACTION_ADD_ITEM';
        const updatedKey = selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'isWall' : 'isDesert';

        setGridData((oldGridData) =>
          update(oldGridData, {
            [row]: {
              [col]: {
                [updatedKey]: { $set: value },
              },
            },
          }),
        );
      }
    },
    [selectedDrawingItem],
  );

  /**
   * Handle mousedown event on the container wrapping all grid cells
   */
  const handleMouseDownOnTheContainerOfAllCells = useCallback(
    (event: SyntheticEvent) => {
      /**
       * If the virtualization process is running,
       * prevent all attached events of all cells from happening
       * by stop the further propagation of the mouse events
       */
      if (isVirtualizing) event.stopPropagation();
    },
    [isVirtualizing],
  );

  /**
   * Handle mousedown event on a cell
   */
  const handleMouseDownOnCell = useCallback(
    (
      row: number,
      col: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
      isDesert: boolean,
    ) => {
      if (isStart) {
        setIsChangingStartLocation(true);
      } else if (isEnd) {
        setIsChangingEndLocation(true);
      } else {
        setIsDrawing(true);
        let drawingAction: DrawingAction = 'DRAWING_ACTION_ADD_ITEM';
        /**
         * Starting to draw on a drawn cell will result in
         * the removal of the applied drawing style of the targeted cell.
         * Only cells of the same drawing item type are affected by the removal.
         * E.g. A wall removal will only remove wall styling from wall cells.
         * In contrast, drawing on a empty cell will apply the drawing style.
         */
        if (
          (selectedDrawingItem === 'DRAWING_ITEM_DESERT' && isDesert) ||
          (selectedDrawingItem === 'DRAWING_ITEM_WALL' && isWall)
        ) {
          drawingAction = 'DRAWING_ACTION_REMOVE_ITEM';
        }
        setCurrentDrawingAction(drawingAction);
        /**
         * Apply the drawing action on the mousedown cell.
         */
        handleDrawing(row, col, isStart, isEnd, isWall, isDesert, drawingAction);
      }
    },
    [handleDrawing, selectedDrawingItem],
  );

  /**
   * Handle mouseenet event on a cell
   */
  const handleMouseEnterOnCell = useCallback(
    (
      row: number,
      col: number,
      isStart: boolean,
      isEnd: boolean,
      isWall: boolean,
      isForest: boolean,
    ) => {
      if (isChangingStartLocation) {
        handleChangeStartLocation(row, col, isStart, isEnd, isWall);
      } else if (isChangingEndLocation) {
        handleChangeEndLocation(row, col, isStart, isEnd, isWall);
      } else if (isDrawing) {
        handleDrawing(row, col, isStart, isEnd, isWall, isForest, currentDrawingAction);
      }
    },
    [
      isChangingStartLocation,
      isChangingEndLocation,
      isDrawing,
      handleChangeStartLocation,
      handleChangeEndLocation,
      handleDrawing,
      currentDrawingAction,
    ],
  );

  /**
   * Handle mouseenet event on a cell
   */
  const handleMouseUpOnCell = useCallback(() => {
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
          /**
           * Use setTimeout to let state update be rendered instead of batched
           */
          const timerId = setTimeout(() => {
            setGridData((prevState) =>
              update(prevState, {
                [visitedRow]: { [visitedCol]: { isVisited: { $set: true } } },
              }),
            );
            if (index === array.length - 1) resolve();
          }, 20 * index);
          /**
           * Keep track of enqueued timers
           */
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
        /**
         * Use setTimeout to let state update be rendered instead of batched
         */
        const timerId = setTimeout(() => {
          setGridData((prevState) =>
            update(prevState, {
              [row]: { [col]: { isPathStep: { $set: true } } },
            }),
          );
          if (index === array.length - 1) resolve();
        }, 30 * index);
        /**
         * Keep track of enqueued timers
         */
        timerIds.current.push(timerId);
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
    setIsVirtualizationDone(false);
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
    setIsVirtualizationDone(false);
  }, []);

  /**
   * Start the virtualization process
   */
  const handleVirtualize = async () => {
    handleClearVirtualizedData();

    setIsVirtualizing(true);
    setIsVirtualizationDone(false);

    const visitedInOrder: GridLocation[] = [];
    const algorithmFunc = ALGORITHMS[selectedAlgorithm].execute;

    /**
     * Calculate location mapping (location - location that it came from)
     */
    const cameFrom = algorithmFunc(
      gridData,
      startRow,
      startCol,
      endRow,
      endCol,
      (visitedLocation) => {
        /**
         * Save all visited location in visting order
         */
        visitedInOrder.push(visitedLocation);
      },
    );
    /**
     * Animate the visited location
     */
    await animateAlgorithm(visitedInOrder);

    /**
     * Generate list of locations that form the shortest path from start location to end location
     */
    const paths = pathConstruct(cameFrom, gridData, startRow, startCol, endRow, endCol);
    /**
     * Animate the locations that form the shortest path
     */
    await animatePathConstruct(paths);

    setIsVirtualizing(false);
    setIsVirtualizationDone(true);
  };

  /**
   * After a completed virtualization process,
   * if user change the start or end location,
   * the grid will show the path-finding result corresponding with the new start/end location instantly without animation
   */
  const handleInstantPreview = useCallback(
    (startRowIndex: number, startColIndex: number, endRowIndex: number, endColIndex: number) => {
      setGridData((oldGridData) => {
        const visitedInOrder: GridLocation[] = [];

        const algorithmFunc = ALGORITHMS[selectedAlgorithm].execute;

        /**
         * Init the new grid data with a non-virtualized data.
         */
        const newGridData = oldGridData.map((rowData) =>
          rowData.map(
            ({ row, col, isWall, isDesert, isStart, isEnd }) =>
              new GridLocation(row, col, isWall, isDesert, false, false, isStart, isEnd),
          ),
        );

        /**
         * Calculate location mapping (location - location that it came from)
         */
        const cameFrom = algorithmFunc(
          newGridData,
          startRowIndex,
          startColIndex,
          endRowIndex,
          endColIndex,
          (visitedLocation) => {
            visitedInOrder.push(visitedLocation);
          },
        );

        /**
         * Generate list of location that form the shortest path from start location to end location
         */
        const paths = pathConstruct(
          cameFrom,
          newGridData,
          startRowIndex,
          startColIndex,
          endRowIndex,
          endColIndex,
        );

        /**
         * Update grid state to reflect all visited cells
         * We can mutate newGridData since it's a newly created object which is independent to olGridData
         */
        visitedInOrder.forEach(({ row: visitedRow, col: visitedCol }) => {
          newGridData[visitedRow][visitedCol].isVisited = true;
          newGridData[visitedRow][visitedCol].noAnimation = true;
        });

        /**
         * Update grid state to reflect all cells that form the shortest path
         * We can mutate newGridData since it's a newly created object which is independent to olGridData
         */
        paths.forEach(({ row, col }) => {
          newGridData[row][col].isPathStep = true;
        });

        return newGridData;
      });
    },
    [selectedAlgorithm],
  );

  useEffect(() => {
    if (isVirtualizationDone) handleInstantPreview(startRow, startCol, endRow, endCol);
  }, [isVirtualizationDone, startRow, startCol, endRow, endCol, handleInstantPreview]);

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
      <Box
        cursor={isVirtualizing ? 'not-allowed' : ''}
        onMouseDownCapture={handleMouseDownOnTheContainerOfAllCells}
      >
        {gridData.map((rowData, index) => (
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
                  onMouseDown={handleMouseDownOnCell}
                  onMouseEnter={handleMouseEnterOnCell}
                  onMouseUp={handleMouseUpOnCell}
                />
              ),
            )}
          </Flex>
        ))}
      </Box>
      <Flex mt={6} w="full" alignItems="flex-start">
        <HStack>
          <Text fontWeight="600">Drawing item:</Text>
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
            borderWidth="1px"
            bgColor={selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'gray.800' : 'orange.400'}
            borderColor={selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'gray.700' : 'orange.300'}
          />
        </HStack>
        <Spacer />
        <Legends />
      </Flex>
    </Flex>
  );
};

export default Grid;
