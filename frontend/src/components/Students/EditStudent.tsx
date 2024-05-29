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
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }} isCentered>
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
                        <FormControl isRequired isInvalid={!!errors.age}>
                            <FormLabel htmlFor="age">年龄</FormLabel>
                            <Input
                                id="age"
                                {...register("age", {
                                    required: "年龄不能为空",
                                    min: {
                                        value: 0,
                                        message: "年龄不能为负数",
                                    },
                                })}
                                placeholder="请输入学生年龄"
                                type="number"
                            />
                            {errors.age && (
                                <FormErrorMessage>{errors.age.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.grade}>
                            <FormLabel htmlFor="grade">年级</FormLabel>
                            <Input
                                id="grade"
                                {...register("grade", {
                                    required: "年级不能为空",
                                })}
                                placeholder="请输入学生年级"
                                type="text"
                            />
                            {errors.grade && (
                                <FormErrorMessage>{errors.grade.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.gpa}>
                            <FormLabel htmlFor="gpa">平均成绩点 (GPA)</FormLabel>
                            <Input
                                id="gpa"
                                {...register("gpa", {
                                    required: "GPA不能为空",
                                    min: {
                                        value: 0.0,
                                        message: "GPA不能为负数",
                                    },
                                    max: {
                                        value: 4.0,
                                        message: "GPA不能超过4.0",
                                    },
                                })}
                                placeholder="请输入学生GPA"
                                type="number"
                                step="0.01"
                            />
                            {errors.gpa && (
                                <FormErrorMessage>{errors.gpa.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.advisor}>
                            <FormLabel htmlFor="advisor">导师</FormLabel>
                            <Input
                                id="advisor"
                                {...register("advisor", {
                                    required: "导师不能为空",
                                })}
                                placeholder="请输入学生导师"
                                type="text"
                            />
                            {errors.advisor && (
                                <FormErrorMessage>{errors.advisor.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!errors.contact_number}>
                            <FormLabel htmlFor="contact_number">联系电话</FormLabel>
                            <Input
                                id="contact_number"
                                {...register("contact_number", {
                                    pattern: {
                                        value: /^\d{10,15}$/,
                                        message: "无效的电话号码",
                                    },
                                })}
                                placeholder="请输入联系电话"
                                type="tel"
                            />
                            {errors.contact_number && (
                                <FormErrorMessage>{errors.contact_number.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!errors.home_address}>
                            <FormLabel htmlFor="home_address">家庭住址</FormLabel>
                            <Input
                                id="home_address"
                                {...register("home_address")}
                                placeholder="请输入家庭住址"
                                type="text"
                            />
                            {errors.home_address && (
                                <FormErrorMessage>{errors.home_address.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter gap={3}>
                        <Button variant="primary" type="submit" isLoading={isSubmitting}>
                            保存
                        </Button>
                        <Button onClick={onCancel}>取消</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditStudent;