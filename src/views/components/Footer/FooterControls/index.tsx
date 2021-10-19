import { SyntheticEvent, memo, useMemo } from 'react';

import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';

import { MAZE_GENERATION_ALGORITHMS } from 'constants/algorithms/maze-generation';
import { DRAWING_ITEM_DESERT, DRAWING_ITEM_WALL } from 'constants/drawing';
import { INITIAL_SPEED, MAX_SPEED, MIN_SPEED } from 'constants/speed';

export interface Props {
  selectedDrawingItem: string;
  onSelectDrawingItem: (event: SyntheticEvent) => void;
  onSpeedChange: (value: number) => void;
  isVirtualizing: boolean;
  selectedMazePattern: string;
  onSelectMazePattern: (event: SyntheticEvent) => void;
  onApplyMazePattern: () => void;
}

const FooterControls = ({
  selectedDrawingItem,
  onSelectDrawingItem,
  onSpeedChange,
  isVirtualizing,
  selectedMazePattern,
  onSelectMazePattern,
  onApplyMazePattern,
}: Props): JSX.Element => {
  const mazeGeneratonAlgorithmOptions = useMemo(
    () =>
      Object.entries(MAZE_GENERATION_ALGORITHMS).map(([key, { label }]) => (
        <option key={key} value={key}>
          {label}
        </option>
      )),
    [],
  );
  return (
    <Grid
      templateAreas={[
        `'drawingItemLabel' 'drawingItemInput' 'speedLabel' 'speedInput' 'mazeLabel' 'mazeInput'`,
        `'drawingItemLabel drawingItemInput drawingItemInput' 'speedLabel speedInput speedInput' 'mazeLabel mazeInput mazeInput'`,
      ]}
      rowGap={4}
      columnGap={[0, 4]}
      alignItems="center"
      textAlign={['center', 'left']}
      w={['full', 'unset']}
    >
      <GridItem gridArea="drawingItemLabel">
        <Text fontWeight="600">Drawing item:</Text>
      </GridItem>
      <GridItem gridArea="drawingItemInput">
        <HStack>
          <Select
            w={['full', 60]}
            value={selectedDrawingItem}
            disabled={isVirtualizing}
            onChange={onSelectDrawingItem}
          >
            <option value={DRAWING_ITEM_WALL}>Wall</option>
            <option value={DRAWING_ITEM_DESERT}>Desert</option>
          </Select>
          <Box
            ml={2}
            w={4}
            h={4}
            flexShrink={0}
            borderWidth="1px"
            bgColor={selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'gray.800' : 'orange.400'}
            borderColor={selectedDrawingItem === 'DRAWING_ITEM_WALL' ? 'gray.700' : 'orange.300'}
          />
        </HStack>
      </GridItem>
      <GridItem gridArea="speedLabel">
        <Text fontWeight="600">Speed:</Text>
      </GridItem>
      <GridItem gridArea="speedInput">
        <Slider
          colorScheme="cyan"
          aria-label="speed slider"
          width="full"
          min={MIN_SPEED}
          max={MAX_SPEED}
          defaultValue={INITIAL_SPEED}
          onChange={onSpeedChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </GridItem>
      <GridItem gridArea="mazeLabel">
        <Text fontWeight="600">Maze pattern:</Text>
      </GridItem>
      <GridItem gridArea="mazeInput">
        <Stack direction={['column', 'row']}>
          <Select
            w={['full', 60]}
            value={selectedMazePattern}
            disabled={isVirtualizing}
            onChange={onSelectMazePattern}
          >
            {mazeGeneratonAlgorithmOptions}
          </Select>
          <Button colorScheme="gray" onClick={onApplyMazePattern}>
            Apply
          </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default memo(FooterControls);
