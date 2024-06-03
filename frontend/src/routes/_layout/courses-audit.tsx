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
  IconButton,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"
import { Table } from "antd";
import { type ApiError, CoursesService,CourseOut } from "../../client"
import ActionsMenu from "../../components/Courses/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"


export const Route = createFileRoute("/_layout/courses-audit")({
  component: Courses,
})

function Courses() {
  const showToast = useCustomToast()
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery("courese", () => CoursesService.coursesListUnCheckedcourses({}))
  //TOdo 数据库中status的默认值并非 未审核  需要修改

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  const columns = [
    {
        title: '课程编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '课程名',
        dataIndex: 'name',
        key: 'name',
    },
    {
      title: '课程教材',
      dataIndex: 'textbook',
      key: 'name',
    },
    {
      title: '课程安排',
      dataIndex: 'class_time',
      key: 'class_time',
    },
    {
      title: '课程状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: ( record) => <ActionsMenu type={"CourseAudit"} value={record} />,
    }

    ];

  return (
    <>
      {/* {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        courses && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              课程管理
            </Heading>
            <Navbar type={"Course"} />
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>课程编号</Th>
                    <Th>课程名</Th>
                    <Th>课程教材</Th>
                    <Th>课程安排</Th>
                    <Th>课程状态</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courses.data?.map((course) => (
                    <Tr key={course.id}>
                      <Td>{course.id}</Td>
                      <Td>{course.name}</Td>
                      <Td>{course.textbook}</Td>
                      <Td>{course.class_time}</Td>
                      <Td>{course.status}</Td>
                      <Td>
                        <ActionsMenu type={"Course"} value={course} />
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
            待审课程
        </Heading>
        
        <Box pt={0} px={4}>
          <Table dataSource={courses?.data || []} columns={columns} />
        </Box>
      </Container>
    </>
    </>
  )
}

export default Courses
