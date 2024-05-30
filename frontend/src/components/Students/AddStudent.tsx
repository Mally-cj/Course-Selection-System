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

import { type ApiError, type StudentCreate, StudentsService } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface AddStudentProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      student_id: "",
      major: "",
      classLocation: ""
    },
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

  const addStudent = async (data: StudentCreate) => {
    const isUnique = await checkStudentIdUnique(data.student_id);
    if (!isUnique) {
      throw new Error("学号已存在，请使用不同的学号");
    }
    await StudentsService.studentsCreateStudents({ requestBody: data });
  };

  const mutation = useMutation(addStudent, {
    onSuccess: () => {
      showToast("Success!", "Student added successfully.", "success");
      reset();
      onClose();
    },
    onError: (err: ApiError | Error) => {
      const errDetail = err instanceof Error ? err.message : err.body?.detail;
      showToast("Something went wrong.", `${errDetail}`, "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("students");
    },
  });

  const onSubmit: SubmitHandler<StudentCreate> = (data) => {
    mutation.mutate(data);
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
          <ModalHeader>添加学生</ModalHeader>
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
                    message: "学号长度必须为10位",
                  },
                  maxLength: {
                    value: 10,
                    message: "学号长度必须为10位",
                  },
                  validate: {
                    checkUnique: async (value) =>
                      (await checkStudentIdUnique(value)) || "学号已存在，请使用不同的学号",
                  },
                })}
                placeholder="请输入学生学号"
                type="text"
              />
              {errors.student_id && (
                <FormErrorMessage>{errors.student_id.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.major}>
              <FormLabel htmlFor="major">专业</FormLabel>
              <Input
                id="major"
                {...register("major")}
                placeholder="请输入学生专业"
                type="text"
              />
              {errors.major && (
                <FormErrorMessage>{errors.major.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.classLocation}>
              <FormLabel htmlFor="classLocation">教室位置</FormLabel>
              <Input
                id="classLocation"
                {...register("classLocation")}
                placeholder="请输入教室位置"
                type="text"
              />
              {errors.classLocation && (
                <FormErrorMessage>{errors.classLocation.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              取消
            </Button>
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              添加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudent;