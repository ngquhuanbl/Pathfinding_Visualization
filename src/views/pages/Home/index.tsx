import { Flex } from '@chakra-ui/react';

import Grid from 'views/components/Board';

const Home = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Grid />
    </Flex>
  );
};

export default Home;
