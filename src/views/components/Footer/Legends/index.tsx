import { memo } from 'react';

import { HStack, Box, Text, Grid, GridItem } from '@chakra-ui/react';

const Legends = () => {
  return (
    <Grid
      autoRows="40px"
      templateAreas={[
        `'start visited path' 'end desertVisited desertPath' 'wall . .' 'desert . .'`,
        `'start end wall desert' '. . visited desertVisited' '. . path desertPath'`,
      ]}
      gap={4}
      alignItems="center"
    >
      <GridItem gridArea="start">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="red.400"
            borderColor="red.300"
            flexShrink={0}
          />
          <Text>Start</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="end">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="green.400"
            borderColor="green.300"
            flexShrink={0}
          />
          <Text>End</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="wall">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="gray.800"
            borderColor="gray.700"
            flexShrink={0}
          />
          <Text>Wall</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="desert">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="orange.400"
            borderColor="orange.300"
            flexShrink={0}
          />
          <Text>Desert</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="visited">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="blue.300"
            borderColor="blue.200"
            flexShrink={0}
          />
          <Text>Visited</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="desertVisited">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="orange.500"
            borderColor="orange.400"
            flexShrink={0}
          />
          <Text>Visited desert</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="path">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="yellow.300"
            borderColor="yellow.200"
            flexShrink={0}
          />
          <Text>Path</Text>
        </HStack>
      </GridItem>
      <GridItem gridArea="desertPath">
        <HStack>
          <Box
            w={4}
            h={4}
            borderWidth="1px"
            bgColor="yellow.500"
            borderColor="yellow.400"
            flexShrink={0}
          />
          <Text>Path through desert</Text>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default memo(Legends);
