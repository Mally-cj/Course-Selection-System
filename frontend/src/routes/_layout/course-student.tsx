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
import Exporttexcel from '../../components/Courses/Exporttoexcel';

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
  const processedData = studentlist?.data.map((student, index) => {
    return {
      id: index + 1,
      student_id: student.student.student_id,
      name: student.student.name,
      email: student.student.email,
      major: student.student.major,
    };
  });
  const columns = [
    {
        title: '序号',
        dataIndex: 'id'
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

    ];

  return (
    <>
      
      <>
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={8} pb={12}>
             {courseName}的选课名单
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Rebackbar type={"ReturnCourse"} />
          <Exporttexcel data={processedData} filename={`${courseName}_选课名单.xlsx`} buttonText="导出 Excel" />
        </Flex>
        <Box pt={0} px={4}>
          <Table dataSource={processedData} columns={columns} />;
        </Box>
      </Container>
    </>
    </>
  )
}

export default Coursestudent
