import React, { useState } from "react";
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Button,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"

import { type ApiError, type UserOut, TeachersService } from "../../client"
import ActionsMenu from "../../components/Teachers/TeaManActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

import TeacherDetails from "../../components/Teachers/teacherDetail"; // 导入新的组件


export const Route = createFileRoute("/_layout/teacher-management")({
  component: TeacherManage,
})

// TODO: 可以加个管理员身份验证

function TeacherManage() {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()

  // 渲染
  const [importedData, setImportedData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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


  const handleDataImported = (data) => {
    console.log("Imported data:", data);
    setImportedData(data);
  };

  const processedData = teachers?.data.map(teacher => ({
    teacher_id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    title: teacher.title,
    college: teacher.college
  }));


   // 渲染教师详细信息
   const renderTeacherDetails = (teachers) => (
    <TeacherDetails teachers={teachers} onClose={() => setSelectedTeacher(null)} />
  );


  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : selectedTeacher?(renderTeacherDetails(selectedTeacher)
    ):
    (
        teachers && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              教师管理
            </Heading>
              <Navbar type={"Teacher"} />
            <TableContainer>
              <Table fontSize="md" size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>Full name</Th>
                    <Th>Email</Th>
                    <Th>id</Th>
                    <Th>title</Th>
                    <Th>college</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teachers.data?.map((teacher) => (
                    <Tr key={teacher.id}>
                      
                      <Td>
                      <Button variant="link" onClick={() => setSelectedTeacher(teacher)}>
                        {teacher.name}
                        </Button>
                        </Td>
                      {/* TODO: 补充数据库的表然后填补 */}
                      <Td>{teacher.email}</Td>
                      <Td>{teacher.id}</Td>
                      <Td>{teacher.title}</Td>
                      <Td>{teacher.college }</Td>
                      <Td>
                        <ActionsMenu
                          type="Teacher"
                          value={teacher}
                        //ToDO: ActionsMenu的Teachers类
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            
          </Container>
        )
      )}
    </>
  )
}

export default TeacherManage
