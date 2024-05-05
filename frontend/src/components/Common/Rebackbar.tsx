import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import type React from "react"
import { FaAngleLeft } from "react-icons/fa"

import ReturnCourse from "../Courses/Returncourse"
interface NavbarProps {
  type: string
}

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  let onClick: React.MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  let item: JSX.Element | undefined = undefined;
  if (type === "ReturnCourse") {
    const returnCourseModal = useDisclosure()
    onClick = returnCourseModal.onOpen;
    item = <ReturnCourse isOpen={returnCourseModal.isOpen} onClose={returnCourseModal.onClose} />;
  }
  return (
    <>
      <Flex py={8} gap={4}>
        {/* TODO: Complete search functionality */}
        {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaSearch} color='gray.400' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search' fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
                </InputGroup> */}
        <Button
          variant="primary"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
          onClick={onClick}
        >
          <Icon as={FaAngleLeft} />  {type}
        </Button>
        {item}
      </Flex>
    </>
  )
}

export default Navbar
