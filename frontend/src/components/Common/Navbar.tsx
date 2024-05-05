import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import type React from "react"
import { FaPlus } from "react-icons/fa"

import AddUser from "../Admin/AddUser"
import AddItem from "../Items/AddItem"
import AddCourse from "../Courses/Addcourse"

interface NavbarProps {
  type: string
}

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  let onClick: React.MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  let item: JSX.Element | undefined = undefined;
  if (type === "User") {
    const addUserModal = useDisclosure()
    onClick = addUserModal.onOpen
    item = <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
  } else if (type === "Item") {
    const addItemModal = useDisclosure()
    onClick = addItemModal.onOpen
    item =  <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
  } else if (type === "Course") {
    const addCourseModal = useDisclosure()
    onClick = addCourseModal.onOpen
    item = <AddCourse isOpen={addCourseModal.isOpen} onClose={addCourseModal.onClose} />
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
          <Icon as={FaPlus} /> 添加 {type}
        </Button>
        {item}
      </Flex>
    </>
  )
}

export default Navbar
