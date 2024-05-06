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

import { type ApiError, type UserOut, StudentsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/student-management")({
  component: StuManage,
})

// TODO: 可以加个管理员身份验证

function StuManage() {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery("students", () => StudentsService.studentsListStudents({}))

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
        students && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              学生管理
            </Heading>
            <Navbar type={"Student"} />
            <TableContainer>
              <Table fontSize="md" size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>Full name</Th>
                    <Th>Email</Th>
                    <Th>id</Th>
                    <Th>Major</Th>
                    <Th>ClassLocation</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students.data?.map((students) => (
                    <Tr key={students.id}>

                      <Td>{students.name}</Td>
                      {/* TODO: 补充数据库的表然后填补 */}
                      <Td>{students.email}</Td>
                      <Td>{students.student_id}</Td>
                      <Td>{students.major}</Td>
                      <Td>{students.classLocation}</Td>
                      <Td>
                        <ActionsMenu
                          type="Student"
                          value={students}
                        //ToDO: ActionsMenu的students类
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

export default StuManage
