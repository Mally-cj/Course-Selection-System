import {
  Badge,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorMode,
} from "@chakra-ui/react"
import type React from "react"

const Appearance: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          外观模式设置
        </Heading>
        <RadioGroup onChange={toggleColorMode} value={colorMode}>
          <Stack>
            {/* TODO: Add system default option */}
            <Radio value="light" colorScheme="teal">
              明亮模式
              <Badge ml="1" colorScheme="teal">
                Default
              </Badge>
            </Radio>
            <Radio value="dark" colorScheme="teal">
              夜间模式
            </Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}
export default Appearance
