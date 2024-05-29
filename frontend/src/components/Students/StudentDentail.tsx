import React from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    GridItem,
    Heading,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { StudentsService } from "../../client";

function StudentDetails({ student, onClose }) {
    const queryClient = useQueryClient();
    const currentUser = queryClient.getQueryData("currentUser");

    const { data: courses, isLoading, isError, error } = useQuery(
        ["courses", student.id],
        () => StudentsService.studentsListStudentCourses({ id: student.id || 0 })
    );

    const headerStyle = {
        backgroundColor: '#3182CE', // 蓝色底色
        color: 'white', // 白色字体
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '8px',
    };

    return (
        <Container maxW="full" p={4}>
            <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="white">
                <Box style={headerStyle}>
                    <Heading size="lg">学生详细信息</Heading>
                </Box>
                <Divider borderColor="blue.500" />
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>姓名：</strong>{student.name}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>邮箱：</strong>{student.email}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>学号：</strong>{student.student_id}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>专业：</strong>{student.major}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>教室位置：</strong>{student.classLocation}</Text>
                    </GridItem>
                </Grid>
                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">更多信息</Heading>
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg"><strong>年龄：</strong>{student.age}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>年级：</strong>{student.grade}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>GPA：</strong>{student.gpa}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>导师：</strong>{student.advisor}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>联系方式：</strong>{student.contact_number}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>地址：</strong>{student.home_address}</Text>
                    </GridItem>
                </Grid>
                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">选修课程</Heading>
                </Box>
                {isLoading ? (
                    <Spinner />
                ) : isError ? (
                    <Text color="red.500">获取学生选课数据时出错: {error.message}</Text>
                ) : (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                        {(courses?.data ?? []).map((course, index) => (
                            <GridItem key={index}>
                                <Text fontSize="lg"><strong>课程{index + 1}：</strong>{course.name}</Text>
                            </GridItem>
                        ))}
                    </Grid>
                )}
                <Button mt={4} colorScheme="teal" onClick={onClose}>返回</Button>
            </Box>
        </Container>
    );
}

export default StudentDetails;