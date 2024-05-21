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

  const addStudent = async (data: StudentCreate) => {
    await StudentsService.studentsCreateStudents({ requestBody: data });
  };

  const mutation = useMutation(addStudent, {
    onSuccess: () => {
      showToast("Success!", "Student added successfully.", "success");
      reset();
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

          <ModalFooter>
            <Button onClick={onClose}>取消</Button>
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
              ml={3}
            >
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudent;
