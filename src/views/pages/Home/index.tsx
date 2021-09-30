import { Flex } from '@chakra-ui/react';

import Board from 'views/components/Board';

const Home = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Board />
    </Flex>
  );
};

export default Home;
