import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"

import { type ApiError, type UserOut, TeachersService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/teacher-management")({
  component: TeacherManage,
})

// TODO: 可以加个管理员身份验证

function TeacherManage() {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery("teachers", () => TeachersService.teachersListTeacher({}))

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        teachers && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              教师管理
            </Heading>
            <Navbar type={"Teachers"} />
            <TableContainer>
              <Table fontSize="md" size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>Full name</Th>
                    <Th>Email</Th>
                    <Th>id</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teachers.data?.map((teachers) => (
                    <Tr key={teachers.id}>
                      
                      <Td>{teachers.name}</Td>
                      {/* TODO: 补充数据库的表然后填补 */}
                      <Td>{}</Td>
                      <Td>{}</Td>
                      <Td>{}</Td>
                      
                      <Td>
                        <ActionsMenu
                          type="User"
                          value={teachers}
                        //ToDO: ActionsMenu的Teachers类
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        )
      )}
    </>
  )
}

export default TeacherManage
