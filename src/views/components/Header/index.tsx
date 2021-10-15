import { SyntheticEvent, memo } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Select, Stack, Text, Spacer } from '@chakra-ui/react';

export interface AlgorithmOption {
  value: string;
  label: string;
}

interface Props {
  selectedAlgorithm: string;
  algorithmOptions: AlgorithmOption[];
  onSelectedAlgorithmChange: (event: SyntheticEvent) => void;
  isVirtualizing: boolean;
  onStartVirtualization: () => void;
  onClearVirtualizationResults: () => void;
  onClearAll: () => void;
}

const Header = ({
  selectedAlgorithm,
  algorithmOptions,
  onSelectedAlgorithmChange,
  isVirtualizing,
  onStartVirtualization,
  onClearVirtualizationResults,
  onClearAll,
}: Props) => (
  <Stack
    direction={['column', 'column', 'column', 'column', 'row']}
    alignItems={['center', 'center', 'center', 'center']}
  >
    <Stack direction={['column', 'row', 'row', 'row', 'row']} alignItems="center">
      <Text fontWeight="600">Algorithm:</Text>
      <Select
        w={60}
        value={selectedAlgorithm}
        disabled={isVirtualizing}
        onChange={onSelectedAlgorithmChange}
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
        onClick={onStartVirtualization}
        disabled={isVirtualizing}
        isLoading={isVirtualizing}
        loadingText="Virtualizing ..."
      >
        Virtualize algorithm
      </Button>
    </Stack>
    <Spacer />
    <Stack direction={['column', 'column', 'row', 'row', 'row']}>
      <Button leftIcon={<DeleteIcon />} colorScheme="purple" onClick={onClearVirtualizationResults}>
        Clear virtualization results
      </Button>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={onClearAll}>
        <Text display={['none', 'block']}>Clear virtualization results + walls + desert</Text>
        <Text display={['block', 'none']}>Clear all</Text>
      </Button>
    </Stack>
  </Stack>
);

export default memo(Header);
