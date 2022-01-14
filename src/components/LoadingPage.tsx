import { CircularProgress, Heading, VStack } from "@chakra-ui/react";

type LoadingPageProps = {
  title?: string;
  subtitle?: string;
};

const LoadingPage = ({ title = "InterCheck", subtitle = "Test rápido" }: LoadingPageProps) => {
  return (
    <VStack align="center" justify="space-around">
      <Heading as="h1">{title}</Heading>
      <Heading as="h2" size="md">
        {subtitle}
      </Heading>
      <CircularProgress isIndeterminate pt="4rem" size="8rem" />
    </VStack>
  );
};

export default LoadingPage;
