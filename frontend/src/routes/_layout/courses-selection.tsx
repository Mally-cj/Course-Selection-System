import { Box, Container, Heading, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { Table } from "antd"
import { useQuery, useQueryClient } from "react-query"
import { ApiError, CourseOut, CoursesService, UserOut } from "../../client"

export const Route = createFileRoute("/_layout/courses-selection")({
  component: CourseSelect,
})

function CourseSelect() {
    const queryClient = useQueryClient()

    const currentUser = queryClient.getQueryData<UserOut>("currentUser")

    const {
        data: courses,
        isLoading,
        isError,
        error,
      } = useQuery("courses", () => CoursesService.coursesListCourses({}))
      
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
            render: (item: CourseOut) => <a onClick={
                async () => {
                    let resp = null;
                    try {
                        resp = await CoursesService.coursesSelectCourse({requestBody: {
                            course_id: item.id || 0,
                            student_id: currentUser?.student_id || 0
                        }})
                        alert("选课成功")
                    }
                    catch (e: any){
                        // 将e转换为ApiError
                        const apierror = e as ApiError;
                        alert(apierror.body.detail);
                        console.log(apierror.body);
                    }
                    
                }
            }>选课</a>,
          },
        ];
        
        return (
        <>
            <Container maxW="full">
                <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
                    课程选择
                </Heading>
                <Box pt={12} m={4}>
                    <Table dataSource={courses?.data || []} columns={columns} />;
                </Box>
            </Container>
        </>
        )
}

export default CourseSelect
