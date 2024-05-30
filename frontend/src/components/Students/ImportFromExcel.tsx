import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button, Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { StudentsService } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";
import type { StudentCreate } from '../../client/models/StudentCreate';

const ImportFromExcel = () => {
    const queryClient = useQueryClient();
    const showToast = useCustomToast();
    const fileInputRef = useRef(null);
    const mutation = useMutation((students: StudentCreate[]) => StudentsService.studentsCreateStudentsBulk({
        requestBody: { students }
    }), {
        onSuccess: () => {
            showToast("Success!", "Students uploaded successfully.", "success");
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            showToast("Error!", 'Failed to upload students. ' + error.message, "error");
        }
    });

    const checkStudentIdUnique = async (student_id: string) => {
        try {
            const { data: studentsList } = await StudentsService.studentsListStudents({ limit: 1000 });
            return !studentsList.some((student) => student.student_id === student_id);
        } catch (error) {
            console.error("Error fetching students:", error);
            return false;
        }
    };

    const validateStudentData = (student: StudentCreate) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const classLocationRegex = /^[A-Za-z]\d{3}$/;

        if (!student.name) {
            return '姓名不能为空';
        }
        if (!student.email || !emailRegex.test(student.email)) {
            return '无效的电子邮箱地址';
        }
        if (!student.student_id || student.student_id.length !== 10) {
            return '学号必须是10位';
        }
        if (!student.major) {
            return '专业不能为空';
        }
        if (!student.classLocation || !classLocationRegex.test(student.classLocation)) {
            return '班级格式必须是一个字母加三个数字';
        }
        return null;
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) {
            showToast("Error!", "No file selected.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                const typedData = jsonData.map((item) => ({
                    name: item.FullName,
                    email: item.Email,
                    student_id: item.ID,
                    major: item.Major,
                    classLocation: item.ClassLocation
                }));

                const validationErrors = typedData.map(validateStudentData).filter(error => error !== null);
                if (validationErrors.length > 0) {
                    showToast("Error!", "Data validation failed: " + validationErrors.join(', '), "error");
                    return;
                }

                // 检查学号唯一性
                for (const student of typedData) {
                    const isUnique = await checkStudentIdUnique(student.student_id);
                    if (!isUnique) {
                        showToast("Error!", `学号 ${student.student_id} 已存在，请使用不同的学号`, "error");
                        return;
                    }
                }

                mutation.mutate(typedData);
            } catch (error) {
                showToast("Error!", "Failed to read or process the Excel file.", "error");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <Input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                hidden
            />
            <Button onClick={triggerFileInput} colorScheme="blue" size="md">
                导入 Excel
            </Button>
        </div>
    );
};

export default ImportFromExcel;