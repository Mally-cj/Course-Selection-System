import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQueryClient } from "react-query"

import type { UserOut } from "../../client"
import {  AnnouncementsService} from "../../client"
import { useQuery } from "react-query"
import { Table } from "antd";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const queryClient = useQueryClient()

  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const user_type=currentUser?.user_type

  if (user_type === 2) {
    const {
      data: announcementlist,
      isLoading,
      error,
    } = useQuery("announcement", () => 
      AnnouncementsService.announcementsGetStudentcourseannouncement({ studentId: currentUser.student_id })
    );

    const processedData = announcementlist?.data.map((announcement, index) => ({
      key: index + 1,
      content: announcement.content,
    }));

    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '公告内容',
        dataIndex: 'content',
        key: 'content',
      },
    ];

    return (
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>美好的一天，欢迎您!2</Text>
        </Box>
        <Box pt={0} px={4}>
          {isLoading ? (
            <Text>加载中...</Text>
          ) : error ? (
            <Text>加载公告时出错</Text>
          ) : (
            <Table dataSource={processedData} columns={columns} />
          )}
        </Box>
      </Container>
    );
  }
  return (
    <>
    <Container maxW="full">
      <Box pt={12} m={4}>
        <Text fontSize="2xl">
          Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
        </Text>
        <Text>美好的一天，欢迎您!</Text>
      </Box>
    </Container>
   </>
  )
}

export default Dashboard
