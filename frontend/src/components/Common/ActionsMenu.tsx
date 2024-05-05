import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import type React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash, FiLink } from "react-icons/fi"

import type { ItemOut, UserOut, CourseOut } from "../../client"
import EditUser from "../Admin/EditUser"
import EditItem from "../Items/EditItem"
import Delete from "./DeleteAlert"
import EditCourse from "../Courses/EditCourse"

interface ActionsMenuProps {
  type: string
  value: ItemOut | UserOut | CourseOut
  disabled?: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ type, value, disabled }) => {
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()

  let editItem: (value: any) => JSX.Element | null = null;
  if (type === "User") {
    editItem = (value: any) => (
      <EditUser
        user={value as UserOut}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />)
  } else if (type === "Item") {
    editItem = (value: any) => (
      <EditItem
        item={value as ItemOut}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />)
  } else if (type === "Course") {
    editItem = (value: any) => (
      <EditCourse
        item={value as CourseOut}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />)
  }
  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={editUserModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            编辑课程 
          </MenuItem>
          <MenuItem
          icon={<FiLink fontSize="16px" />}
            onClick={() => {
              // Example: Redirect to a specific page
              window.location.href = `/course-student`;
            }}
          >
            选课名单
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            删除 
          </MenuItem>
        </MenuList>
        {editItem(value)}
      
        <Delete
          type={type}
          id={value.id}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default ActionsMenu
