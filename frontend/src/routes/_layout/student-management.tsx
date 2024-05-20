import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
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
  Text
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "react-query";
import * as XLSX from 'xlsx';

import { type ApiError, type UserOut, StudentsService } from "../../client";
import ActionsMenu from "../../components/Common/ActionsMenu";
import Navbar from "../../components/Common/Navbar";
import useCustomToast from "../../hooks/useCustomToast";
import ImportFromExcel from "../../components/Students/ImportFromExcel";
import ExportToExcel from "../../components/Students/ExportToExcel";
import StudentDetails from "../../components/Students/StudentDentail"; // 导入新的组件

export const Route = createFileRoute("/_layout/student-management")({
  component: StuManage,
});

function StuManage() {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const [importedData, setImportedData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data: students, isLoading, isError, error } = useQuery("students", StudentsService.studentsListStudents);

  const handleDataImported = (data) => {
    console.log("Imported data:", data);
    setImportedData(data);
  };

  const processedData = students?.data.map(student => ({
    student_id: student.student_id,
    name: student.name,
    email: student.email,
    major: student.major,
    classLocation: student.classLocation
  }));

  console.log("Processed data:", processedData);
  console.log("Imported data state:", importedData);

  if (isError) {
    const errDetail = (error as ApiError).body?.detail;
    showToast("出现错误。", `${errDetail}`, "error");
  }

  // 渲染学生详细信息
  const renderStudentDetails = (student) => (
    <StudentDetails student={student} onClose={() => setSelectedStudent(null)} />
  );

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : selectedStudent ? (
        renderStudentDetails(selectedStudent)
      ) : (
        <Container maxW="full">
          <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
            学生管理
          </Heading>
          <Navbar type={"Student"} />
          <TableContainer>
            <Table fontSize="md" size={{ base: "sm", md: "md" }}>
              <Thead>
                <Tr>
                  <Th>Full name</Th>
                  <Th>Email</Th>
                  <Th>ID</Th>
                  <Th>Major</Th>
                  <Th>Class Location</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students?.data.map(student => (
                  <Tr key={student.id}>
                    <Td>
                      <Button variant="link" onClick={() => setSelectedStudent(student)}>
                        {student.name}
                      </Button>
                    </Td>
                    <Td>{student.email}</Td>
                    <Td>{student.student_id}</Td>
                    <Td>{student.major}</Td>
                    <Td>{student.classLocation}</Td>
                    <Td>
                      <ActionsMenu type="Student" value={student} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justify="space-between" align="center" mt={4}>
            <ExportToExcel data={importedData.length > 0 ? importedData : processedData} filename="StudentsList.xlsx" buttonText="导出 Excel" />
            <ImportFromExcel onImported={handleDataImported} />
          </Flex>
          {importedData.length > 0 && (
            <Box overflowX="auto" mt={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Full name</Th>
                    <Th>Email</Th>
                    <Th>ID</Th>
                    <Th>Major</Th>
                    <Th>Class Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {importedData.map((row, index) => (
                    <Tr key={index}>
                      <Td>{row.name}</Td>
                      <Td>{row.email}</Td>
                      <Td>{row.student_id}</Td>
                      <Td>{row.major}</Td>
                      <Td>{row.classLocation}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Container>
      )}
    </>
  );
}

export default StuManage;
