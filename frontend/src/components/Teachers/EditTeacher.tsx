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
                        <FormControl isInvalid={!!errors.phone}>
                            <FormLabel htmlFor="phone">电话</FormLabel>
                            <Input
                                id="phone"
                                {...register("phone", {
                                    pattern: {
                                        value: /^[0-9]{7,15}$/,
                                        message: "无效的电话号码",
                                    },
                                })}
                                placeholder="请输入电话号码"
                                type="tel"
                            />
                            {errors.phone && <FormErrorMessage>{errors.phone.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.homepage}>
                            <FormLabel htmlFor="homepage">主页</FormLabel>
                            <Input
                                id="homepage"
                                {...register("homepage", {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\w\d\-_]+)\.([\w\d\-_]+)([\w\d\-.,@?^=%&:/~+#]*[\w\d\-@?^=%&/~+#])?$/,
                                        message: "无效的网址",
                                    },
                                })}
                                placeholder="请输入主页网址"
                                type="url"
                            />
                            {errors.homepage && <FormErrorMessage>{errors.homepage.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.address}>
                            <FormLabel htmlFor="address">地址</FormLabel>
                            <Input
                                id="address"
                                {...register("address", {
                                    validate: (value) => value.trim() !== "" || "地址不能为空",
                                })}
                                placeholder="请输入地址"
                                type="text"
                            />
                            {errors.address && <FormErrorMessage>{errors.address.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.postalCode}>
                            <FormLabel htmlFor="postalCode">邮政编码</FormLabel>
                            <Input
                                id="postalCode"
                                {...register("postalCode", {
                                    pattern: {
                                        value: /^[0-9]{5,10}$/,
                                        message: "无效的邮政编码",
                                    },
                                })}
                                placeholder="请输入邮政编码"
                                type="text"
                            />
                            {errors.postalCode && <FormErrorMessage>{errors.postalCode.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.Education}>
                            <FormLabel htmlFor="Education">教育背景</FormLabel>
                            <Input
                                id="Education"
                                {...register("Education", {
                                    validate: (value) => value.trim() !== "" || "教育背景不能为空",
                                })}
                                placeholder="请输入教育背景"
                                type="text"
                            />
                            {errors.Education && <FormErrorMessage>{errors.Education.message}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onCancel} mr={3}>
                            取消
                        </Button>
                        <Button
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            保存
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditTeacher;