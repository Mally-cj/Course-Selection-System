import React from "react";
import { Box, Button, Container, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Block } from "@tanstack/react-router";
import { Flex } from "antd";

function TeacherDetails({ teachers, onClose }) {
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
                    <Heading size="lg">教师详细信息</Heading>
                </Box>
                <Divider borderColor="blue.500" />
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>姓名：</strong>{teachers.name}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>邮箱：</strong>{teachers.email}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>学号：</strong>{teachers.id}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>职称：</strong>{teachers.major}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>大学：</strong>{teachers.college}</Text>
                    </GridItem>
                </Grid>
                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">更多信息</Heading>
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg"><strong>年龄：</strong>21</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>年级：</strong>大三</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>GPA：</strong>3.8</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>导师：</strong>张教授</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>联系方式：</strong>123-456-7890</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>地址：</strong>北京市朝阳区</Text>
                    </GridItem>
                </Grid>
                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">选修课程</Heading>
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg"><strong>课程1：</strong>自然语言处理</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>课程2：</strong>计算机视觉</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>课程3：</strong>机器学习</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>课程4：</strong>深度学习</Text>
                    </GridItem>
                </Grid>
                <Flex justify="center" align="center">
                    <Button mt={4} m="a"  colorScheme="teal" onClick={onClose}>返回</Button>
                </Flex>
                
            </Box>
        </Container>
    );
}

export default TeacherDetails;
