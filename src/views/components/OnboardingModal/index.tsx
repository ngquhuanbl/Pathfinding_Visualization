import { useState, useEffect, useMemo, useCallback } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Spacer,
  Link,
} from '@chakra-ui/react';

import onboardingStep3 from 'assets/feature-drawing-wall-desert.gif';
import onboardingStep4DuringVisualization from 'assets/feature-speed-modification.gif';
import { ReactComponent as LogoIcon } from 'assets/logo.svg';
import onboardingStep1 from 'assets/onboarding-step1.gif';
import onboardingStep2Desktop from 'assets/onboarding-step2-desktop.gif';
import onboardingStep2Mobile from 'assets/onboarding-step2-mobile.gif';
import onboardingStep4 from 'assets/onboarding-step4.gif';
import onboardingStep5 from 'assets/onboarding-step5.gif';
import onboardingStep6 from 'assets/onboarding-step6.gif';
import { isMobileOrTabletDevice } from 'utils/device-checking';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  finalRef?: React.RefObject<HTMLButtonElement>;
}

const OnboardingModal = ({ isOpen, onClose, finalRef }: Props): JSX.Element => {
  const [stepIndex, setStep] = useState(0);

  const handleNext = useCallback(() => {
    setStep((prevState) => prevState + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    setStep((prevState) => prevState - 1);
  }, []);

  useEffect(() => {
    if (!isOpen) setStep(0);
  }, [isOpen]);

  const stepsList = useMemo(() => {
    const step0 = (
      <ModalContent>
        <ModalHeader>Welcome!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <LogoIcon />
            <VStack spacing="0.5" alignItems="flex-start">
              <Text fontSize="2xl" fontWeight="bold">
                Pathfinding visualization
              </Text>
              <Text>
                by{' '}
                <Link
                  isExternal
                  href="https://github.com/ngquhuanbl"
                  color="teal.500"
                  fontWeight="bold"
                >
                  @ngquhuanbl
                </Link>
              </Text>
            </VStack>
            <Text>“Algorithm is beautiful! Just visualize it!”</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleNext}>
            Get started
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step1 = (
      <ModalContent>
        <ModalHeader>Step 1</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Select an algorithm
            </Text>
            <Text>There are 5 available algorithms</Text>
            <img src={onboardingStep1} alt="Step 1 of onboarding" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step2 = (
      <ModalContent>
        <ModalHeader>Step 2</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Adjust the start/end location (optional)
            </Text>
            {isMobileOrTabletDevice() ? (
              <>
                <Text>Perform drag and drop action</Text>
                <img src={onboardingStep2Mobile} alt="Step 2 of onboarding" />
              </>
            ) : (
              <>
                <Text>Select the old start/end location, then select the new location</Text>
                <img src={onboardingStep2Desktop} alt="Step 2 of onboarding" />
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step3 = (
      <ModalContent>
        <ModalHeader>Step 3</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Add/remove wall and desert (optional)
            </Text>
            <Text>Select a drawing item (wall or desert), then draw on the grid</Text>
            <img src={onboardingStep3} alt="Step 3 of onboarding" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step4 = (
      <ModalContent>
        <ModalHeader>Step 4</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Adjust the animation speed (optional)
            </Text>
            <Text>Use the speed slider</Text>
            <img src={onboardingStep4} alt="Step 4 of onboarding" />
            <Text>It&apos;s possible to adjust the speed during visualization process</Text>
            <img
              src={onboardingStep4DuringVisualization}
              alt="Step 4 of onboarding (during visualization)"
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step5 = (
      <ModalContent>
        <ModalHeader>Step 5</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Generate maze (optional)
            </Text>
            <Text>
              Select a maze pattern, then hit the <b>Apply</b> button
            </Text>
            <img src={onboardingStep5} alt="Step 5 of onboarding" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    const step6 = (
      <ModalContent>
        <ModalHeader>Finish</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">
              Start the visualization process
            </Text>
            <Text>
              Click the <b>Virtualize</b> button
            </Text>
            <img src={onboardingStep6} alt="Step 6 of onboarding" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrevious}>Previous</Button>
          <Spacer />
          <Button colorScheme="teal" onClick={onClose}>
            Let&apos;s visualize
          </Button>
        </ModalFooter>
      </ModalContent>
    );

    return [step0, step1, step2, step3, step4, step5, step6];
  }, [handleNext, handlePrevious, onClose]);

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      size="xl"
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      {stepsList[stepIndex]}
    </Modal>
  );
};

export default OnboardingModal;
