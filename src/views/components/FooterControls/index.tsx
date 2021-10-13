import { SyntheticEvent, memo } from 'react';

import {
  Box,
  Grid,
  GridItem,
  HStack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

interface Props {
  selectedDrawingItem: string;
  onSelectDrawingItem: (event: SyntheticEvent) => void;
  isVirtualizing: boolean;
}

const FooterControls = ({
  selectedDrawingItem,
  onSelectDrawingItem,
  isVirtualizing,
}: Props): JSX.Element => {
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
      alignItems="center"
    >
      <GridItem colSpan={1} display="inline" verticalAlign="middle">
        <Text fontWeight="600">Drawing item:</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <HStack>
          <Select
            w={60}
            value={selectedDrawingItem}
            disabled={isVirtualizing}
            onChange={onSelectDrawingItem}
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
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontWeight="600">Speed:</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Slider aria-label="slider-ex-1" defaultValue={30} w={10} width="full">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </GridItem>
    </Grid>
  );
};

export default memo(FooterControls);
