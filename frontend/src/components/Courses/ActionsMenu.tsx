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

import type { ItemOut, UserOut, CourseOut,  } from "../../client"
import EditUser from "../Admin/EditUser"
import Display from "../Courses/Display"

import Delete from "../Common/DeleteAlert"
import Confirm from "../Common/ConfirmAlert"

import EditCourse from "../Courses/EditCourse"
import AddCourseannuncement from "../Courses/Addcourse-announcement"
import EditCourseannouncement from "../Courses/EditCourse-announcement"

interface ActionsMenuProps {
  type: string
  value: ItemOut | UserOut | CourseOut 
  disabled?: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ type, value, disabled }) => {
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()
  const confirmModal = useDisclosure()
  const editCourseModal = useDisclosure()
  const editCourseannouncementModal = useDisclosure()
  const addCourseannuncementModal = useDisclosure()


  let editItem: (value: any) => JSX.Element | null = null;
  if (type === "User") {
    editItem = (value: any) => (
      <EditUser
        user={value as UserOut}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />)
  }  else if (type === "Course") {
    editItem = (value: any) => (
      <EditCourse
        item={value as CourseOut}
        isOpen={editCourseModal.isOpen}
        onClose={editCourseModal.onClose}
      />)}else if (type === "Announcement") {
        editItem = (value: any) => (
          <EditCourseannouncement
            item={value as CourseOut}
            isOpen={editCourseannouncementModal.isOpen}
            onClose={editCourseannouncementModal.onClose}
          />)
  }
  else if (type === "CourseAudit") {
    editItem = (value: any) => (
      <EditCourse
        item={value as CourseOut}
        isOpen={editCourseModal.isOpen}
        onClose={editCourseModal.onClose}
      />)
  }

    if(type === "Course"){
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
              onClick={editCourseModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
            >
              编辑课程信息
            </MenuItem>
            <MenuItem
            icon={<FiLink fontSize="16px" />}
              onClick={() => {
                // Example: Redirect to a specific page
                window.location.href = `/course-student?courseId=${value.id}&courseName=${value.name}`;
              }}
            >
              选课名单
            </MenuItem>
            <MenuItem
            icon={<FiLink fontSize="16px" />}
              onClick={() => {
                // Example: Redirect to a specific page
                window.location.href = `/course-comment?courseId=${value.id}&courseName=${value.name}`;
              }}
            >
              课程评价
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
    } else if (type === "Announcement") {
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
              onClick={editCourseannouncementModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
            >
              调课
            </MenuItem>
            <MenuItem
              onClick={addCourseannuncementModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
            >
              新增公告
            </MenuItem>
            <MenuItem
              onClick={addCourseannuncementModal.onOpen}
              icon={<FiTrash fontSize="16px" />}
              color="ui.danger"
            >
              删除 
            </MenuItem>
          </MenuList>
          {editItem(value)}
          <AddCourseannuncement
            type={type}
            id={value.id}
            isOpen={addCourseannuncementModal.isOpen}
            onClose={addCourseannuncementModal.onClose}
          />
        </Menu>
        </>
          )
    }
    else if(type === "CourseAudit"){
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
              onClick={editCourseModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
            >
              编辑课程信息
            </MenuItem>
            
            <MenuItem
              onClick={confirmModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
              color="ui.success"
            >
              审核通过
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
        
          <Confirm
            type={type}
            id={value.id}
            isOpen={confirmModal.isOpen}
            onClose={confirmModal.onClose}
          />
          
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
    else return null


}

export default ActionsMenu
