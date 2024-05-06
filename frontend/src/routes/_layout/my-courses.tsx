import { Box, Container, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"
import { Table } from "antd";

import { CourseOut, CoursesService, StudentsService, type UserOut } from "../../client"
import AddComment from "../../components/Comment/AddComment";
import { useState } from "react";

export const Route = createFileRoute("/_layout/my-courses")({
  component: MyCourse,
})

function MyCourse() {
  const queryClient = useQueryClient()

  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery("courses", () => StudentsService.studentsListStudentCourses({
    id: currentUser?.student_id || 0
  }))
  const addCommentModal = useDisclosure()
  const [selectCourseId, setSelectCourseId] = useState(0);
  const student_id = currentUser?.student_id || 0;

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
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (item: CourseOut) => <a onClick={ () => {
          setSelectCourseId(item.id || 0);
          addCommentModal.onOpen()
        }}>评价</a>,
      },
  ];
  
  return (
    <>
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
            我的课程
        </Heading>
        <AddComment courseId={selectCourseId} studentId={student_id} isOpen={addCommentModal.isOpen} onClose={addCommentModal.onClose} />
        <Box pt={12} m={4}>
          <Table dataSource={courses?.data || []} columns={columns} />;
        </Box>
      </Container>
    </>
  )
}

export default MyCourse
