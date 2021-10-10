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
  isDesert: boolean;
  onMouseDown: (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
    isForest: boolean,
  ) => void;
  onMouseEnter: (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
    isForest: boolean,
  ) => void;
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
    background-color: var(--chakra-colors-blue-600);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-blue-300);
  }
`;

const desertVisitedKeyframe = keyframes`
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
    background-color: var(--chakra-colors-blue-600);
  }

  100% {
    transform: scale(1);
    background-color: var(--chakra-colors-orange-800);
    border-color: var(--chakra-colors-orange-800);
  }
`;

const startOrEndKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
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
    border-color: var(--chakra-colors-blue-200);
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
  isDesert,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props): JSX.Element => {
  /**
   * Order of animation keyframe priority:
   * startOrEndKeyframe > pathStepKeyframe > desertVisitedKeyframe > visitedKeyframe
   */
  let borderColor = 'blue.200';
  let bgColor = 'white';

  if (isStart) {
    borderColor = 'red.400';
    bgColor = 'red.400';
  } else if (isEnd) {
    borderColor = 'green.400';
    bgColor = 'green.400';
  } else if (isWall) {
    borderColor = 'gray.800';
    bgColor = 'gray.800';
  } else if (isDesert) {
    borderColor = 'orange.400';
    bgColor = 'orange.400';
  }

  let animation;
  if (isVisited) {
    if (isDesert) animation = `${desertVisitedKeyframe} 1 1.5s ease-out alternate forwards`;
    else animation = `${visitedKeyframe} 1 1.5s ease-out alternate forwards`;
  }

  if (isPathStep) animation = `${pathStepKeyframe} 1 1.5s ease-out alternate forwards`;

  if ((isVisited || isPathStep) && (isStart || isEnd))
    animation = `${startOrEndKeyframe} 1 1.5s ease-out alternate forwards`;

  const handleMouseDown = useCallback(() => {
    onMouseDown(row, col, isStart, isEnd, isWall, isDesert);
  }, [row, col, isStart, isEnd, isWall, isDesert, onMouseDown]);

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(row, col, isStart, isEnd, isWall, isDesert);
  }, [row, col, isStart, isEnd, isWall, isDesert, onMouseEnter]);

  const handleMouseUp = useCallback(() => {
    onMouseUp(row, col);
  }, [row, col, onMouseUp]);

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      w={6}
      h={6}
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      bgColor={bgColor}
      animation={animation}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    />
  );
};

export default memo(Cell);
