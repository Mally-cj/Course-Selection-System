import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Spinner,
  Text
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"

import { type ApiError, type UserOut, TeachersService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

import { CourseOut, CoursesService } from "../../client"

export const Route = createFileRoute("/_layout/course-statistic")({
  component: CourseStatistic,
})

// TODO: 可以加个管理员身份验证

import ReactEcharts from 'echarts-for-react';
import axisTrigger from "echarts/types/src/component/axisPointer/axisTrigger.js"

function CourseStatistic() {
  
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
 
 
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery("courses", () => CoursesService.coursesListCheckedcourses<CourseOut>({}))

  const values = courses?.data.map(course => course.current_capacity);

  const names = courses?.data.map(course => course.name);

  const dicts = courses?.data.map(course => ({
    name: course.name,
    value: course.current_capacity
  }));

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
        data: names,
        axisLabel: {
        interval: 0   // 强制显示所有标签
      },
      },
      
      yAxis: {},
      series: [
        {
          name: '选课人数',
          type: 'bar',
          data: values
        },
        
      ]
    };
  };

  const getOption2 = () => ({
      title: {
        text: '选课率统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '选课率',
          type: 'pie',
          radius: '50%',
          data: dicts,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
  });
  

  return (
    <>
      {isLoading ? (
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
              课程统计
            </Heading>
            
            <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '100%' }}
      />

      <ReactEcharts option={getOption2()} style={{ height: '400px', width: '100%' }}/> 
          </Container>
        )
      )}
    </>
  )
}



export default CourseStatistic
