import { SyntheticEvent, memo, useMemo } from 'react';

import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, Select, Stack, Text, Spacer } from '@chakra-ui/react';

import { PATH_FINDING_ALGORITHMS } from 'constants/algorithms/path-finding';

import Logo from './Logo';

export interface AlgorithmOption {
  value: string;
  label: string;
}

interface Props {
  selectedAlgorithm: string;
  onSelectedAlgorithmChange: (event: SyntheticEvent) => void;
  isVirtualizing: boolean;
  onStartVisualization: () => void;
  onDone: () => void;
  onClearVisualizationResults: () => void;
  onClearAll: () => void;
}

const Header = ({
  selectedAlgorithm,
  onSelectedAlgorithmChange,
  isVirtualizing,
  onStartVisualization,
  onDone,
  onClearVisualizationResults,
  onClearAll,
}: Props) => {
  /**
   * A list of algorithm options
   */
  const algorithmOptions: AlgorithmOption[] = useMemo(() => {
    return Object.entries(PATH_FINDING_ALGORITHMS).map(([value, { label }]) => ({
      label,
      value,
    }));
  }, []);
  return (
    <Stack
      direction={['column', 'column', 'column', 'column', 'row']}
      alignItems={['center', 'center', 'center', 'center']}
    >
      <Logo isVirtualizing={isVirtualizing} />
      <Stack
        direction={['column', 'column', 'row', 'row', 'row']}
        alignItems="center"
        w={['full', 'full', 'unset']}
      >
        <Text fontWeight="600">Algorithm:</Text>
        <Select
          w={['full', 'full', 60]}
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
          colorScheme="teal"
          onClick={onStartVisualization}
          disabled={isVirtualizing}
          w={['full', 'full', 'unset']}
        >
          Virtualize algorithm
        </Button>
        {isVirtualizing && (
          <Button
            colorScheme="green"
            leftIcon={<CheckIcon />}
            onClick={onDone}
            w={['full', 'full', 'unset']}
          >
            Done
          </Button>
        )}
      </Stack>
      <Spacer />
      <Stack direction={['column', 'column', 'row', 'row', 'row']} w={['full', 'full', 'unset']}>
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="purple"
          onClick={onClearVisualizationResults}
        >
          Clear visualization results
        </Button>
        <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={onClearAll}>
          <Text display={['none', 'block']}>Clear visualization results + walls + desert</Text>
          <Text display={['block', 'none']}>Clear all</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(Header);
