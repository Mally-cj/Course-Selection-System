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

import type { ItemOut, UserOut, StudentUpdate, TeacherUpdate } from "../../client"

import EditTeacher from "./EditTeacher"


import Delete from "../Common/DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: ItemOut | UserOut | StudentUpdate | TeacherUpdate
  disabled?: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ type, value, disabled }) => {
  const editUserModal = useDisclosure()
  const ViewTeacherModal = useDisclosure()
  const deleteModal = useDisclosure()

  let editItem: (value: any) => JSX.Element | null = null;
  if (type === "Teacher") {
    editItem = (value: any) => (
      <EditTeacher
        teacher={value as TeacherUpdate}
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
            编辑 {type}
          </MenuItem>
          
          {/* <MenuItem
            onClick={() => {
              // Example: Redirect to a specific page
              window.location.href = `/teacherDetailInfo?teacherId=${value.id}`;
            }}
            icon={<FiEdit fontSize="16px" />}
            
          >
            教师信息
          </MenuItem> */}

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
