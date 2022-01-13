import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/react";

type Props = {
  max?: number;
  min?: number;
  onChange?: (newVal: number | string) => void;
  precision?: number;
  step?: number;
  value?: number;
};

const NumberSliderInput = ({ max, min, onChange, precision, step, value }: Props) => {
  return (
    <Flex>
      <NumberInput
        maxW="100px"
        mr="2rem"
        max={max}
        min={min}
        onChange={onChange}
        precision={precision}
        step={step}
        value={value}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        max={max}
        min={min}
        onChange={onChange}
        precision={precision}
        step={step}
        value={value}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={value} />
      </Slider>
    </Flex>
  );
};

export default NumberSliderInput;
