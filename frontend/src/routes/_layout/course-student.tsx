import {
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
import { useQuery } from "react-query"

import { type ApiError, CoursesService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Rebackbar from "../../components/Common/Rebackbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/course-student")({
  component: Coursestudent,
})

function Coursestudent() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const courseId = urlParams.get('courseId');
  const courseName = urlParams.get('courseName');
  const showToast = useCustomToast()
  const {
    data: studentlist,
    isLoading,
    isError,
    error,
  } = useQuery("studentlist", () => CoursesService.coursesGetenrollmentlist({courseId: courseId}))
  console.log(studentlist);
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
        studentlist && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              {courseName}的选课名单
            </Heading>
            <Rebackbar type={"ReturnCourse"} />
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>序号</Th>
                    <Th>学号</Th>
                    <Th>姓名</Th>
                    <Th>学院</Th>
                    <Th>邮箱</Th>
                    {/* <Th>Actions</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {studentlist.data?.map((enrollment,index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{enrollment.student.student_id}</Td>
                      <Td>{enrollment.student.name}</Td>
                      <Td>{enrollment.student.major}</Td>
                      <Td>{enrollment.student.email}</Td>
                      {/* <Td>
                        <ActionsMenu type={"student"} value={student} />
                      </Td> */}
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

export default Coursestudent
