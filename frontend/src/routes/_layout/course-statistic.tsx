import {
  Badge,
  Box,
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
import { useQuery, useQueryClient } from "react-query"

import { type ApiError, type UserOut, TeachersService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/course-statistic")({
  component: TeacherManage,
})

// TODO: 可以加个管理员身份验证

import ReactEcharts from 'echarts-for-react';


function TeacherManage() {
  const sales = [2, 2, 1, 1, 1, 2];
  //const stores = [15, 120, 36, 110, 110, 20];

  // 配置选项
  const getOption = () => {
    return {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['选课人数']
      },
      xAxis: {
        data: ["数学", "英语", "qqq", "小明", "整时展", "2525"]
      },
      yAxis: {},
      series: [
        {
          name: '选课人数',
          type: 'bar',
          data: sales
        },
        
      ]
    };
  };





  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery("teachers", () => TeachersService.teachersListTeacher({}))

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
        teachers && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              课程统计
            </Heading>
            
            <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '100%' }}
      />

      
          </Container>
        )
      )}
    </>
  )
}

export default TeacherManage
