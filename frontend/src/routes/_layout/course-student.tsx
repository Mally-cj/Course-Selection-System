import {
  Container,
  Flex,
  Heading,
  Spinner,
  // Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"
import { Table } from "antd";

import { type ApiError, CoursesService } from "../../client"
import ActionsMenu from "../../components/Courses/ActionsMenu"
import Rebackbar from "../../components/Courses/Rebackbar"
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

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }
  const processedData = studentlist?.data.map((student) => {
    return {
      course_id: student.course_id,
      student_id: student.student.student_id,
      name: student.student.name,
      email: student.student.email,
      major: student.student.major,
      classLocation: student.student.classLocation,
    };
  });
  const columns = [
    {
        title: '序号',
        render: (text, record, index) => index + 1
    },
    {
      title: '学号',
      dataIndex: 'student_id',
      // key: 'student.student_id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '学院',
      dataIndex: 'major',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    // {
    //   title: 'Action',
    //   dataIndex: '',
    //   key: 'x',
    //   render: ( record) => <ActionsMenu type={"Course"} value={record} />,
    // }

    ];

  return (
    <>
      {/* {isLoading ? (
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
                    {/* <Th>Actions</Th> 
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
                      </Td> 
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        )
      )} */}
      <>
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={8} pb={12}>
             {courseName}的选课名单
        </Heading>
        <Rebackbar type={"ReturnCourse"} mb={4} />
        <Box pt={0} px={4}>
          <Table dataSource={processedData} columns={columns} />;
        </Box>
      </Container>
    </>
    </>
  )
}

export default Coursestudent
