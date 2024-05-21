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
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import {
    type ApiError,
    type TeacherUpdate,
    TeachersService,
} from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface EditTeacherProps {
    teacher: TeacherUpdate;
    isOpen: boolean;
    onClose: () => void;
}

const EditTeacher: React.FC<EditTeacherProps> = ({ teacher, isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const showToast = useCustomToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<TeacherUpdate>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: teacher,
    });

    const updateTeacher = async (data: TeacherUpdate) => {
        await TeachersService.teachersUpdateTeacher({ id: teacher.id, requestBody: data });
    };

    const mutation = useMutation(updateTeacher, {
        onSuccess: () => {
            showToast("Success!", "Teacher updated successfully.", "success");
            onClose();
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail;
            showToast("Something went wrong.", `${errDetail}`, "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries("teachers");
        },
    });

    const onSubmit: SubmitHandler<TeacherUpdate> = async (data) => {
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
                    <ModalHeader>编辑教师信息</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired isInvalid={!!errors.name}>
                            <FormLabel htmlFor="name">姓名</FormLabel>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "姓名不能为空",
                                    validate: (value) => value.trim() !== "" || "姓名不能为空",
                                })}
                                placeholder="请输入教师姓名"
                                type="text"
                            />
                            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
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
                                placeholder="请输入教师邮箱"
                                type="email"
                            />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.title}>
                            <FormLabel htmlFor="title">职称</FormLabel>
                            <Input
                                id="title"
                                {...register("title", {
                                    required: "职称不能为空",
                                    validate: (value) => {
                                        const validTitles = ["教授", "副教授", "讲师", "助教"];
                                        return validTitles.includes(value.trim()) || "无效的职称";
                                    },
                                })}
                                placeholder="请输入教师职称"
                                type="text"
                            />
                            {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.college}>
                            <FormLabel htmlFor="college">所属学院</FormLabel>
                            <Input
                                id="college"
                                {...register("college", {
                                    required: "所属学院不能为空",
                                    validate: (value) => value.trim() !== "" || "所属学院不能为空",
                                })}
                                placeholder="请输入教师所属学院"
                                type="text"
                            />
                            {errors.college && <FormErrorMessage>{errors.college.message}</FormErrorMessage>}
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

export default EditTeacher;
