import { MAX_DELAY } from 'constants/delay';
import { MAX_SPEED } from 'constants/speed';

export const calculateDelayFromSpeed = (speed: number): number => {
  return MAX_DELAY * (1 - speed / MAX_SPEED);
};
