import { SyntheticEvent, memo } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Select, Flex, Text, Spacer } from '@chakra-ui/react';

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

const HeaderControls = ({
  selectedAlgorithm,
  algorithmOptions,
  onSelectedAlgorithmChange,
  isVirtualizing,
  onStartVirtualization,
  onClearVirtualizationResults,
  onClearAll,
}: Props) => (
  <Flex alignItems="center">
    <Text mr={2} fontWeight="600">
      Algorithm:
    </Text>
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
    <Spacer />
    <Button leftIcon={<DeleteIcon />} colorScheme="purple" onClick={onClearVirtualizationResults}>
      Clear virtualization results
    </Button>
    <Button ml="4" leftIcon={<DeleteIcon />} colorScheme="red" onClick={onClearAll}>
      Clear virtualization results + walls + desert
    </Button>
  </Flex>
);

export default memo(HeaderControls);
