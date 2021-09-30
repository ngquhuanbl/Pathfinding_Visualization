import { memo } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

interface Props {
  isVisited: boolean;
  isPathStep: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const visitedKeyframe = keyframes`
  0% {
    transform: scale(0.3);
    background-color: var(--chakra-colors-purple-400);
    border-radius: 50%;
  }

  50% {
    background-color: var(--chakra-colors-cyan-500);
  }

  75% {
    transform: scale(1.2);
    background-color: var(--chakra-colors-blue-500);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-teal-300);
  }
`;

const pathStepKeyframe = keyframes`
  0% {
    transform: scale(0.6);
    background-color: var(--chakra-colors-yellow-100);
  }

  50% {
    transform: scale(1.2);
    background-color: var(--chakra-colors-yellow-200);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-yellow-300);
  }
`;

const Cell = ({ isVisited, isPathStep, isStart, isEnd }: Props): JSX.Element => {
  let animation;
  if (isVisited)
    animation = `${visitedKeyframe} 1 1.5s ease-out alternate ${
      isStart || isEnd ? 'none' : 'forwards'
    }`;
  if (isPathStep)
    animation = `${pathStepKeyframe} 1 1.5s ease-out alternate ${
      isStart || isEnd ? 'none' : 'forwards'
    }`;

  let borderColor = 'blue.200';

  let bgColor = 'white';
  if (isStart) {
    borderColor = 'red.400';
    bgColor = 'red.400';
  }
  if (isEnd) {
    borderColor = 'green.400';
    bgColor = 'green.400';
  }

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      w={6}
      h={6}
      display="inline-block"
      bgColor={bgColor}
      animation={animation}
    />
  );
};

export default memo(Cell);
