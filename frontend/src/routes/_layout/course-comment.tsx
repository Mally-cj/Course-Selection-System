import {
  Container,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"
import { Table } from "antd";
import { useState } from "react";

import { type ApiError, CommentsService } from "../../client"
import Rebackbar from "../../components/Courses/Rebackbar"
import useCustomToast from "../../hooks/useCustomToast"
import Display from "../../components/Courses/Display"

export const Route = createFileRoute("/_layout/course-comment")({
  component: Coursecomment,
})

function Coursecomment() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const courseId = urlParams.get('courseId');
  const courseName = urlParams.get('courseName');
  const showToast = useCustomToast()
  const {
    data: commentlist,
    isLoading,
    isError,
    error,
  } = useQuery("studentlist", () => CommentsService.getcommentsBycourse({courseId: courseId}))

  // const displayModal = useDisclosure()
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleOpenDisplay = (recordData) => {
    // console.log(recordData)
    setSelectedRecord(recordData);
        // console.log(recordData)
    setDisplayModal(true); // 打开模态框
  };


  const handleDisplayClose = () => {
    setDisplayModal(false); // 关闭模态框
  };
  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }
  // console.log(commentlist)
  const processedData = commentlist?.data.map((comment, index) => {
    return {
      id: index + 1,
      student_id: comment.student.student_id,
      name: comment.student.name,
      major: comment.student.major,
      comment: comment.content,
      comment_id:comment.id
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
      title: '操作',
      key: 'x',
      // dataIndex: 'comment_id',
      render: (record) => (
        <a onClick={() => handleOpenDisplay(record)}>查看评价</a>
      ),

    },

    ];

  return (
    <>
      <>
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={8} pb={12}>
             {courseName}的课程评论
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Rebackbar type={"ReturnCourse"} />
          <Display record={selectedRecord} isOpen={displayModal} onClose={handleDisplayClose} />
        </Flex>
        <Box pt={0} px={4}>
          <Table  dataSource={processedData} columns={columns} />;
        </Box>
      </Container>
    </>
    </>
  )
}

export default Coursecomment
