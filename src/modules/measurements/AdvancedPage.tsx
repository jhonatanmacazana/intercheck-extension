import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const AdvancedPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Heading as="h1">InterCheck App Extension</Heading>
      <Heading as="h2">Medición avanzada</Heading>

      <Stack
        background="#fff"
        boxShadow="0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)"
        margin={0}
        padding="1rem"
      >
        <Box as="span" fontSize="1rem" color="#1a202c" fontWeight="bold">
          Title
        </Box>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/simple")}>
          Simple
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/advanced")}>
          Avanzado
        </Button>
      </Stack>
    </Box>
  );
};

export default AdvancedPage;
