import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import type React from "react"
import { FaPlus } from "react-icons/fa"

import AddUser from "../Admin/AddUser"
import AddStudent from "../Students/AddStudent"  // 确保你有这个组件
import AddItem from "../Items/AddItem"
import AddCourse from "../Courses/Addcourse"
import ReturnCourse from "../Courses/Returncourse"
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
  } else if (type === "Student") {  // 增加的部分
    const addStudentModal = useDisclosure();
    onClick = addStudentModal.onOpen;
    item = <AddStudent isOpen={addStudentModal.isOpen} onClose={addStudentModal.onClose} />;
  } else if (type == "CourseSelect") {
    // const selectCourseModal = useDisclosure()
    // onClick = selectCourseModal.onOpen
    // item = <SelectCourse isOpen={selectCourseModal.isOpen} onClose={selectCourseModal.onClose} />
  }else if (type === "ReturnCourse") {
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
          <Icon as={FaPlus} /> 添加 {type}
        </Button>
        {item}
      </Flex>
    </>
  )
}

export default Navbar
