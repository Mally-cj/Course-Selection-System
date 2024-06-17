import React from "react";
import { Box, Button, Container, Divider, Grid, GridItem, Heading, Text ,Avatar } from "@chakra-ui/react";
import { Block } from "@tanstack/react-router";
import { Flex } from "antd";
import Icon from '../../assets/images/defaultTeaIcon.jpg';

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

                <Flex align="center" justify="space-around">
                <Avatar marginLeft="-50" src={Icon} size="2xl" ></Avatar>

                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>姓名：</strong>{teachers.name}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>邮箱：</strong>{teachers.email}</Text>
                    </GridItem>
                   
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>职称：</strong>{teachers.title}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg" fontWeight="bold"><strong>大学：</strong>{teachers.college}</Text>
                    </GridItem>
                    
                </Grid>
                </Flex>

                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">更多信息</Heading>
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg"><strong>电话：</strong>{teachers.phone}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>个人主页：</strong>{teachers.homepage}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>通讯地址</strong>{teachers.address}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg"><strong>邮政编码：</strong>{teachers.postalCode}</Text>
                    </GridItem>
                    
                </Grid>
                <Divider my={4} borderColor="blue.500" />
                <Box style={headerStyle}>
                    <Heading size="md">教育经历</Heading>
                </Box>

               
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>

                        {(teachers?.Education.split(/\r?\n/).map(item => item.trim()).filter(item => item !== "") ?? []).map((education, index) => (
                            <GridItem key={index}>
                                <Text fontSize="lg"><strong>经历{index + 1}：</strong>{education}</Text>
                            </GridItem>
                        ))}
                    </Grid>
                


                {/* <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <GridItem>
                        <Text fontSize="lg">1983.04 -- 1987.03：日本东京大学，电气电子工学学士</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg">1987.04 -- 1989.03：日本东京大学，电气电子工学硕士</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="lg">1989.04 -- 1992.03：日本东京大学，电气电子工学博士</Text>
                    </GridItem>
                    
                </Grid> */}
                <Flex justify="center" align="center">
                    <Button mt={4} m="a"  colorScheme="teal" onClick={onClose}>返回</Button>
                </Flex>
                
            </Box>
        </Container>
    );
}

export default TeacherDetails;
