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
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type CourseCreate, CoursesService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddCourseProps {
  isOpen: boolean
  onClose: () => void
}

const AddCourse: React.FC<AddCourseProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const addCourse = async (data: CourseCreate) => {
    await CoursesService.createCourse({ requestBody: data })
  }

  const mutation = useMutation(addCourse, {
    onSuccess: () => {
      showToast("Success!", "Course created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("courses")
    },
  })

  const onSubmit: SubmitHandler<ItemCreate> = (data) => {
    mutation.mutate(data)
  }

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
          <ModalHeader>添加课程</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">课程名</FormLabel>
              <Input
                id="name"
                {...register("name", {
                  required: "课程名不能为空.",
                })}
                placeholder="请输入课程名"
                type="text"
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="book">课程教材</FormLabel>
              <Input
                id="book"
                {...register("book")}
                placeholder="请输入课程教材"
                type="text"
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.time} mt={4}>
              <FormLabel htmlFor="time">上课安排</FormLabel>
              <Input
                id="time"
                {...register("time", {
                  required: "上课安排不能为空.",
                })}
                placeholder="请输入上课安排"
                type="text"
              />
              {errors.time && (
                <FormErrorMessage>{errors.time.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="courseintro">课程简介</FormLabel>
              <Input
                id="courseintro"
                {...register("courseintro")}
                placeholder="请输入课程简介"
                type="text"
                style={{ width: "400px", height: "200px" }}
              />
            </FormControl>
            <FormControl isHidden>
              <Input
                id="status"
                {...register("status", {
                  value: "未审核"
                })}
                type="hidden"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCourse
