import { useCallback, memo } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

export interface Props {
  row: number;
  col: number;
  isVisited: boolean;
  isPathStep: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
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

const startVisitedKeyframe = keyframes`
  0% {
    transform: scale(0.3);
    background-color: var(--chakra-colors-red-400);
    border-radius: 50%;
  }

  50% {
    background-color: var(--chakra-colors-red-400);
  }

  75% {
    transform: scale(1.2);
    background-color: var(--chakra-colors-red-400);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-red-400);
  }
`;

const endVisitedKeyframe = keyframes`
  0% {
    transform: scale(0.3);
    background-color: var(--chakra-colors-green-400);
    border-radius: 50%;
  }

  50% {
    background-color: var(--chakra-colors-green-400);
  }

  75% {
    transform: scale(1.2);
    background-color: var(--chakra-colors-green-400);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-green-400);
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

const Cell = ({
  row,
  col,
  isVisited,
  isPathStep,
  isStart,
  isEnd,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props): JSX.Element => {
  let animation;
  if (isVisited) animation = `${visitedKeyframe} 1 1.5s ease-out alternate forwards`;
  if (isPathStep) animation = `${pathStepKeyframe} 1 1.5s ease-out alternate forwards`;

  let borderColor = 'blue.200';

  let bgColor = 'white';
  if (isStart) {
    borderColor = 'red.400';
    bgColor = 'red.400';
    if (isVisited) animation = `${startVisitedKeyframe} 1 1.5s ease-out alternate forwards`;
  }
  if (isEnd) {
    borderColor = 'green.400';
    bgColor = 'green.400';
    if (isVisited) animation = `${endVisitedKeyframe} 1 1.5s ease-out alternate forwards`;
  }
  if (isWall) {
    borderColor = 'gray.800';
    bgColor = 'gray.800';
  }

  const handleMouseDown = useCallback(() => {
    onMouseDown(row, col);
  }, [row, col, onMouseDown]);

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(row, col);
  }, [row, col, onMouseEnter]);

  const handleMouseUp = useCallback(() => {
    onMouseUp(row, col);
  }, [row, col, onMouseUp]);

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      w={6}
      h={6}
      display="inline-block"
      bgColor={bgColor}
      animation={animation}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    />
  );
};

export default memo(Cell);
