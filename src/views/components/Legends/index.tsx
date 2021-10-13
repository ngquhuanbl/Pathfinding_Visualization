import { memo } from 'react';

import { HStack, Box, Text, VStack } from '@chakra-ui/react';

const Legends = () => {
  return (
    <VStack alignItems="flex-end">
      <HStack h={10} spacing={6}>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="red.400" borderColor="red.300" />
          <Text>Start</Text>
        </HStack>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="green.400" borderColor="green.300" />
          <Text>End</Text>
        </HStack>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="gray.800" borderColor="gray.700" />
          <Text>Wall</Text>
        </HStack>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="orange.400" borderColor="orange.300" />
          <Text>Desert</Text>
        </HStack>
      </HStack>
      <HStack h={10} spacing={6}>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="blue.300" borderColor="blue.200" />
          <Text>Visited</Text>
        </HStack>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="orange.500" borderColor="orange.400" />
          <Text>Visited desert</Text>
        </HStack>
      </HStack>
      <HStack h={10} spacing={6}>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="yellow.300" borderColor="yellow.200" />
          <Text>Path</Text>
        </HStack>
        <HStack>
          <Box w={4} h={4} borderWidth="1px" bgColor="yellow.500" borderColor="yellow.400" />
          <Text>Path through desert</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default memo(Legends);
