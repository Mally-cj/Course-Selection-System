
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import {
    type ApiError,
    type StudentUpdate,
    StudentsService,
} from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface EditStudentProps {
    student: StudentUpdate;
    isOpen: boolean;
    onClose: () => void;
}

const EditStudent: React.FC<EditStudentProps> = ({ student, isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const showToast = useCustomToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isDirty },
    } = useForm<StudentUpdate>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: student,
    });

    const updateStudent = async (data: StudentUpdate) => {
        await StudentsService.studentsUpdateStudent({ id: student.id, requestBody: data });
    };

    const mutation = useMutation(updateStudent, {
        onSuccess: () => {
            showToast("Success!", "Student updated successfully.", "success");
            onClose();
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail;
            showToast("Something went wrong.", `${errDetail}`, "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries("students");
        },
    });

    const onSubmit: SubmitHandler<StudentUpdate> = async (data) => {
        mutation.mutate(data);
    };

    const onCancel = () => {
        reset();
        onClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: "sm", md: "md" }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>编辑学生信息</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired isInvalid={!!errors.name}>
                            <FormLabel htmlFor="name">姓名</FormLabel>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "姓名不能为空",
                                })}
                                placeholder="请输入学生姓名"
                                type="text"
                            />
                            {errors.name && (
                                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormLabel htmlFor="email">电子邮箱</FormLabel>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "电子邮箱不能为空",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "无效的电子邮箱地址",
                                    },
                                })}
                                placeholder="请输入学生邮箱"
                                type="email"
                            />
                            {errors.email && (
                                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.student_id}>
                            <FormLabel htmlFor="student_id">学号</FormLabel>
                            <Input
                                id="student_id"
                                {...register("student_id", {
                                    required: "学号不能为空",
                                    minLength: {
                                        value: 10,
                                        message: "学号必须是10位",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "学号必须是10位",
                                    },
                                })}
                                placeholder="请输入学生学号"
                                type="text"
                            />
                            {errors.student_id && (
                                <FormErrorMessage>{errors.student_id.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.major}>
                            <FormLabel htmlFor="major">专业</FormLabel>
                            <Input
                                id="major"
                                {...register("major", {
                                    required: "专业不能为空",
                                })}
                                placeholder="请输入学生专业"
                                type="text"
                            />
                            {errors.major && (
                                <FormErrorMessage>{errors.major.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.classLocation}>
                            <FormLabel htmlFor="classLocation">班级</FormLabel>
                            <Input
                                id="classLocation"
                                {...register("classLocation", {
                                    required: "班级不能为空",
                                    pattern: {
                                        value: /^[A-Za-z]\d{3}$/,
                                        message: "班级格式必须是一个字母加三个数字",
                                    },
                                })}
                                placeholder="请输入学生班级"
                                type="text"
                            />
                            {errors.classLocation && (
                                <FormErrorMessage>{errors.classLocation.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter gap={3}>
                        <Button variant="primary" type="submit" isLoading={isSubmitting}>
                            Save
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditStudent;
