import { useState, useCallback, useRef, useEffect } from 'react';

import { Box, Flex, VStack } from '@chakra-ui/react';
import merge from 'deepmerge';
import update from 'immutability-helper';

import {
  MAZE_GENERATION_ALGORITHMS,
  MazeGenerationAlgorithmKey,
} from 'constants/algorithms/maze-generation';
import {
  PATH_FINDING_ALGORITHMS,
  PathFindingAlgorithmKey,
} from 'constants/algorithms/path-finding';
import {
  DrawingAction,
  DrawingItem,
  DRAWING_ACTION_ADD_ITEM,
  DRAWING_ACTION_REMOVE_ITEM,
  DRAWING_ITEM_DESERT,
  DRAWING_ITEM_WALL,
} from 'constants/drawing';
import {
  // INITIAL_START_ROW,
  // INITIAL_START_COL,
  // INITIAL_END_ROW,
  // INITIAL_END_COL,
  // N_COL,
  N_ROW,
} from 'constants/grid';
import { INITIAL_SPEED } from 'constants/speed';
import GridLocation from 'utils/data-structures/location/GridLocation';
import { calculateDelayFromSpeed } from 'utils/delay';
import { pathConstruct } from 'utils/path-construct';
import Footer from 'views/components/Footer';
import Grid from 'views/components/Grid';
import Header from 'views/components/Header';

const Homepage = () => {
  /**
   * gridData: The state of the grid's UI at a particular point of time
   * It is usable by ReactJS to render the desired UI
   */
  const [gridData, setGridData] = useState<GridLocation[][]>([]);

  /**
   * startLocation: The starting grid location
   */
  const [startRow, setStartRow] = useState(-1);
  const [startCol, setStartCol] = useState(-1);
  /**
   * endLocation: The ending grid location
   */
  const [endRow, setEndRow] = useState(-1);
  const [endCol, setEndCol] = useState(-1);

  const generateGridDataBasedOnScreensize = useCallback(() => {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const headerHeight = document.getElementById('header')!.clientHeight;
    const footerHeight = document.getElementById('footer')!.clientHeight;
    const viewportPaddings = 32 * 2;
    const gridVerticalPadding = 32 * 2;

    const minGridHeight = N_ROW * 24;

    const newGridWidth = screenWidth - viewportPaddings;
    const newGridHeight = Math.max(
      screenHeight - viewportPaddings - headerHeight - footerHeight - gridVerticalPadding,
      minGridHeight,
    );
    const newNRow = Math.round(newGridHeight / 24);
    const newNCol = Math.round(newGridWidth / 24);

    const newStartRow = Math.floor(newNRow / 2);
    const newStartCol = Math.floor(newNCol / 3);
    const newEndRow = newStartRow;
    const newEndCol = newNCol - newStartCol - 1;

    setStartRow(newStartRow);
    setStartCol(newStartCol);
    setEndRow(newEndRow);
    setEndCol(newEndCol);

    setGridData(
      Array.from({ length: newNRow }, (_, row) =>
        Array.from({ length: newNCol }, (__, col) => {
          const isWall = false;
          const isDesert = false;
          const isVisited = false;
          const isPathStep = false;
          const isStart = row === newStartRow && col === newStartCol;
          const isEnd = row === newEndRow && col === newEndCol;
          return new GridLocation(
            row,
            col,
            isWall,
            isDesert,
            isVisited,
            isPathStep,
            isStart,
            isEnd,
          );
        }),
      ),
    );
  }, []);

  useEffect(() => {
    generateGridDataBasedOnScreensize();
  }, [generateGridDataBasedOnScreensize]);

  /**
   * isVirtualizing: A boolean state indicating if the visualization process is running
   */
  const [isVirtualizing, setIsVirtualizing] = useState(false);
  /**
   * isVisualizationDone: A boolean state indicating if the visualization process is done
   * We implement this state using ref for below reasons:
   * - The state isn't used to trigger re-render but only for keeping track purpose
   * - Its consuming and mutating order have no dependencies on the state batching behavior of React
   * in order for related logic to work properly.
   * - The state is used along with startRow, startCol, endRow, endCol to determine whether an instant preview should occur.
   * If a location changing happens on the start/end location after a completed visualization process and the board is dirty with the result,
   * an instant preview will be occur.
   * Watching the change of the start/end coordinations plus the isVisualizationDone status by useEffect is our go-to.
   * However, if isVisualizationDone is implemented using useState, the effect will run immerdiately after a finished visualization
   * (although there's no modification in location of the start/end location).
   * On the other hand, this undesired consequence also stop the animation before its completion as the instant preview is triggered
   * as long as the isVisualizationDone is true.
   * Since the instant preview discard all animation and uses only direct stylings.
   * When the instant preview is triggered before the completion of the animation, the animation will be stop in the middle of its work.
   */
  const isVisualizationDone = useRef(false);

  /**
   * The visualization process uses setTimeout to schedule UI state update
   * By keep track of scheduled timer Is,
   * we will be able to clear enqueued but not yet executed timer,
   * and stop the visualization process completely when needed.
   */
  const timerId = useRef<NodeJS.Timeout | null>(null);

  /**
   * selectedAlgorithm: Selected path-finding algorithm
   */
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<PathFindingAlgorithmKey>('BFS');

  const handleSelectAlgorithm = useCallback((e) => {
    setSelectedAlgorithm(e.currentTarget.value);
  }, []);

  /**
   * isChangingStartLocation: A boolean state indicating if user is dragging the start location to a new location
   * isChangingEndLocation: A boolean state indicating if user is dragging the end location to a new location
   * isDrawing: A boolean state indicating if user is drawing.
   * (The drawing result will be wall or desert depending on the selected drawing item.)
   *
   * These 3 states correspondingly relate to 3 operations: start location changing, end location changing and grid drawing
   * Such operations happen during 3 events on a cell: mousedown, mouseenter and mouseup.
   * Since these 3 events happen separately, we make use of the 3 mentioned states
   * to be able to aware of which operation is running during an individual event.
   * Our event handler logic doesn't require a specific comsuming order of the 3 states in order to work properly,
   * hence storing the states as refs is acceptable and won't create bugs.
   * The main reason for the use of ref is performance boost.
   * Storing the 3 states using React states (created via useState) will cause the mouseenter event handler to be re-created
   * everytime they changed.
   * Moreover, the handler is passed as props to every cells.
   * Therefore, the function re-creation will cause all cells to re-render.
   */
  const isChangingStartLocation = useRef(false);
  const isChangingEndLocation = useRef(false);
  const isDrawing = useRef(false);

  /**
   * currentDrawingAction: Current drawing action
   */
  const [currentDrawingAction, setCurrentDrawingAction] =
    useState<DrawingAction>(DRAWING_ACTION_ADD_ITEM);
  /**
   * selectedAlgorithm: Selected path-finding algorithm
   */
  const [selectedDrawingItem, setSelectedDrawingItem] = useState<DrawingItem>(DRAWING_ITEM_WALL);

  /**
   * timerDelayValue: Timer delay value
   * We use setTimeout to schedule state update,
   * which will prevent the state update from being batched but enqueued (rendered) right away
   */
  const timerDelayValue = useRef(calculateDelayFromSpeed(INITIAL_SPEED));

  const handleSelectDrawingItem = useCallback((event) => {
    setSelectedDrawingItem(event.currentTarget.value);
  }, []);

  const handleSpeedChange = useCallback((speedValue: number) => {
    timerDelayValue.current = calculateDelayFromSpeed(speedValue);
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
                 * Use deep merge to create the update object config
                 * Normal object destructuring will potentially overide properties
                 * since it's possible for oldStartRow and newStartRow to share the same value
                 * (such scenario can happen to oldStartCol and newStartCol to)
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
                 * Use deep merge to create the update object config
                 * Normal object destructuring will potentially overide properties
                 * since it's possible for oldStartRow and newStartRow to share the same value
                 * (such scenario can happen to oldStartCol and newStartCol too)
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
        if (selectedDrawingItem === DRAWING_ITEM_WALL && isDesert) return;
        /**
         * Prevent user to draw a desert area on a wall location
         */
        if (selectedDrawingItem === DRAWING_ITEM_DESERT && isWall) return;

        const value = drawingAction === DRAWING_ACTION_ADD_ITEM;

        if (selectedDrawingItem === DRAWING_ITEM_WALL)
          setGridData((oldGridData) =>
            update(oldGridData, {
              [row]: {
                [col]: {
                  isWall: { $set: value },
                  /**
                   * Allow user to override a visited/path-step location with a wall
                   */
                  isVisited: { $set: false },
                  isPathStep: { $set: false },
                },
              },
            }),
          );
        else
          setGridData((oldGridData) =>
            update(oldGridData, {
              [row]: {
                [col]: {
                  isDesert: { $set: value },
                },
              },
            }),
          );
      }
    },
    [selectedDrawingItem],
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
        isChangingStartLocation.current = true;
      } else if (isEnd) {
        isChangingEndLocation.current = true;
      } else {
        isDrawing.current = true;
        let drawingAction: DrawingAction = DRAWING_ACTION_ADD_ITEM;
        /**
         * Starting to draw on a drawn cell will result in
         * the removal of the applied drawing style of the targeted cell.
         * Only cells of the same drawing item type are affected by the removal.
         * E.g. A wall removal will only remove wall styling from wall cells.
         * In contrast, drawing on a empty cell will apply the drawing style.
         */
        if (
          (selectedDrawingItem === DRAWING_ITEM_DESERT && isDesert) ||
          (selectedDrawingItem === DRAWING_ITEM_WALL && isWall)
        ) {
          drawingAction = DRAWING_ACTION_REMOVE_ITEM;
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
      if (isChangingStartLocation.current) {
        handleChangeStartLocation(row, col, isStart, isEnd, isWall);
      } else if (isChangingEndLocation.current) {
        handleChangeEndLocation(row, col, isStart, isEnd, isWall);
      } else if (isDrawing.current) {
        handleDrawing(row, col, isStart, isEnd, isWall, isForest, currentDrawingAction);
      }
    },
    [handleChangeStartLocation, handleChangeEndLocation, handleDrawing, currentDrawingAction],
  );

  /**
   * Handle mouseenet event on a cell
   */
  const handleMouseUpOnCell = useCallback(() => {
    isChangingStartLocation.current = false;
    isChangingEndLocation.current = false;
    isDrawing.current = false;
  }, []);

  /**
   * Animate path-finding algorithm
   */
  const animateAlgorithm = useCallback(
    (visitedInOrder: GridLocation[]): Promise<void> =>
      new Promise<void>((resolve) => {
        function recursiveFunc(array: GridLocation[], index: number, resolveFunc: () => void) {
          const n = array.length;

          if (index === n) {
            resolveFunc();
            return;
          }

          /**
           * Skip the whole animation if user click the Done button
           */
          if (isVisualizationDone.current) {
            setGridData((oldGridData) => {
              let newGridData = update(oldGridData, {});
              let i = index;
              while (i < n) {
                const { row: visitedRow, col: visitedCol } = array[i];
                newGridData = update(newGridData, {
                  [visitedRow]: {
                    [visitedCol]: {
                      isVisited: { $set: true },
                      noAnimation: { $set: true },
                    },
                  },
                });
                i += 1;
              }
              return newGridData;
            });
            resolve();
            return;
          }

          timerId.current = setTimeout(() => {
            const { row: visitedRow, col: visitedCol } = array[index];
            setGridData((oldGridData) =>
              update(oldGridData, {
                [visitedRow]: { [visitedCol]: { isVisited: { $set: true } } },
              }),
            );
            recursiveFunc(array, index + 1, resolveFunc);
          }, timerDelayValue.current);
        }
        recursiveFunc(visitedInOrder, 0, resolve);
      }),
    [],
  );

  /**
   * Animate path constructing
   */
  const animatePathConstruct = useCallback((paths: GridLocation[]): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (paths.length === 0) resolve();

      function recursiveFunc(array: GridLocation[], index: number, resolveFunc: () => void) {
        const n = array.length;

        if (index === array.length) {
          resolveFunc();
          return;
        }

        /**
         * Skip the whole animation if user click the Done button
         */
        if (isVisualizationDone.current) {
          setGridData((oldGridData) => {
            let newGridData = update(oldGridData, {});
            let i = index;
            while (i < n) {
              const { row: visitedRow, col: visitedCol } = array[i];
              newGridData = update(newGridData, {
                [visitedRow]: {
                  [visitedCol]: {
                    isPathStep: { $set: true },
                    noAnimation: { $set: true },
                  },
                },
              });
              i += 1;
            }
            return newGridData;
          });
          resolve();
          return;
        }

        timerId.current = setTimeout(() => {
          /**
           * Use setTimeout to let state update be rendered instead of batched
           */
          const { row: visitedRow, col: visitedCol } = array[index];
          setGridData((prevState) =>
            update(prevState, {
              [visitedRow]: { [visitedCol]: { isPathStep: { $set: true } } },
            }),
          );
          recursiveFunc(array, index + 1, resolveFunc);
        }, timerDelayValue.current);
      }

      recursiveFunc(paths, 0, resolve);
    });
  }, []);

  /**
   * Stop the visualization process
   * by clear the timer and update process status
   */
  const stopVisualization = useCallback(() => {
    // Clear enqueued timeout events
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    setIsVirtualizing(false);
    isVisualizationDone.current = false;
  }, []);

  /**
   * Clear only virtualized data
   */
  const handleClearVisualizationResults = useCallback(() => {
    stopVisualization();

    setGridData((oldGridData) =>
      oldGridData.map((rowData) =>
        rowData.map(
          ({ row, col, isWall, isDesert, isStart, isEnd }) =>
            new GridLocation(row, col, isWall, isDesert, false, false, isStart, isEnd),
        ),
      ),
    );
  }, [stopVisualization]);

  /**
   * Clear all (virtualized data + walls)
   */
  const handleClearAll = useCallback(() => {
    stopVisualization();

    setGridData((oldGridData) =>
      oldGridData.map((rowData) =>
        rowData.map(
          ({ row, col, isStart, isEnd }) =>
            new GridLocation(row, col, false, false, false, false, isStart, isEnd),
        ),
      ),
    );
  }, [stopVisualization]);

  /**
   * Start the visualization process
   */
  const handleStartVisualization = async () => {
    handleClearVisualizationResults();

    setIsVirtualizing(true);

    const visitedInOrder: GridLocation[] = [];
    const algorithmFunc = PATH_FINDING_ALGORITHMS[selectedAlgorithm].execute;

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
    isVisualizationDone.current = true;
  };

  /**
   * After a completed visualization process,
   * if user change the start or end location,
   * the grid will show the path-finding result corresponding with the new start/end location instantly without animation
   */
  const handleInstantPreview = useCallback(
    (startRowIndex: number, startColIndex: number, endRowIndex: number, endColIndex: number) => {
      setGridData((oldGridData) => {
        const visitedInOrder: GridLocation[] = [];

        const algorithmFunc = PATH_FINDING_ALGORITHMS[selectedAlgorithm].execute;

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
    /**
     * Trigger instant preview when user modify the start/end location after a completed visualization
     */
    if (isVisualizationDone.current) handleInstantPreview(startRow, startCol, endRow, endCol);
  }, [startRow, startCol, endRow, endCol, handleInstantPreview]);

  /**
   * Responsive feature
   * When user resizes the browser window or the page is loaded on a small-screen device,
   * we will:
   * * Step 1: Stop any running visualization process
   * * Step 2: Resizing the grid to match the screen size
   */
  const handleWindowResize = useCallback(() => {
    stopVisualization();

    generateGridDataBasedOnScreensize();
  }, [stopVisualization, generateGridDataBasedOnScreensize]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  const handleDone = useCallback(() => {
    isVisualizationDone.current = true;
  }, []);

  const [selectedMazePattern, setSelectedMazePattern] = useState<MazeGenerationAlgorithmKey>(
    'RECURSIVE_DIVISION_EQUAL',
  );

  const handleSelectMazePatter = useCallback((event) => {
    setSelectedMazePattern(event.currentTarget.value);
  }, []);

  const handleGenerateMaze = useCallback(() => {
    handleClearAll();

    setGridData((oldGridData) => {
      const mazedGridData = MAZE_GENERATION_ALGORITHMS[selectedMazePattern].execute(
        oldGridData,
        startRow,
        startCol,
        endRow,
        endCol,
      );

      return mazedGridData;
    });
  }, [handleClearAll, selectedMazePattern, startRow, startCol, endRow, endCol]);

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" padding={8}>
      <VStack spacing={6}>
        <Box w="full" id="header">
          <Header
            selectedAlgorithm={selectedAlgorithm}
            onSelectedAlgorithmChange={handleSelectAlgorithm}
            isVirtualizing={isVirtualizing}
            onStartVisualization={handleStartVisualization}
            onDone={handleDone}
            onClearVisualizationResults={handleClearVisualizationResults}
            onClearAll={handleClearAll}
          />
        </Box>
        <Grid
          isVirtualizing={isVirtualizing}
          data={gridData}
          onMouseDownOnCell={handleMouseDownOnCell}
          onMouseEnterOnCell={handleMouseEnterOnCell}
          onMouseUpOnCell={handleMouseUpOnCell}
        />
        <Box w="full" id="footer">
          <Footer
            selectedDrawingItem={selectedDrawingItem}
            onSelectDrawingItem={handleSelectDrawingItem}
            isVirtualizing={isVirtualizing}
            onSpeedChange={handleSpeedChange}
            selectedMazePattern={selectedMazePattern}
            onSelectMazePattern={handleSelectMazePatter}
            onApplyMazePattern={handleGenerateMaze}
          />
        </Box>
      </VStack>
    </Flex>
  );
};

export default Homepage;
