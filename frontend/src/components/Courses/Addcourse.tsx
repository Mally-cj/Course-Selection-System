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
      name: "",
      description: "",
    },
  })

  const addCourse = async (data: CourseCreate) => {
    await CoursesService.coursesCreateCourses({ requestBody: data })
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

  const onSubmit: SubmitHandler<CourseCreate> = (data) => {
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
              <FormLabel htmlFor="textbook">课程教材</FormLabel>
              <Input
                id="textbook"
                {...register("textbook")}
                placeholder="请输入课程教材"
                type="text"
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.class_time} mt={4}>
              <FormLabel htmlFor="class_time">上课安排</FormLabel>
              <Input
                id="class_time"
                {...register("class_time", {
                  required: "上课安排不能为空.",
                })}
                placeholder="请输入上课安排"
                type="text"
              />
              {errors.class_time && (
                <FormErrorMessage>{errors.class_time.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.max_capacity} mt={4}>
              <FormLabel htmlFor="max_capacity">课程最大人数</FormLabel>
              <Input
                id="max_capacity"
                {...register("max_capacity", {
                  required: "上课容量不能为空.",
                })}
                placeholder="请输入课程人数"
                type="text"
              />
              {errors.class_time && (
                <FormErrorMessage>{errors.max_capacity.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.class_location} mt={4}>
              <FormLabel htmlFor="class_location">上课地点</FormLabel>
              <Input
                id="class_location"
                {...register("class_location", {
                  required: "上课地点不能为空.",
                })}
                placeholder="请输入上课地点"
                type="text"
              />
              {errors.class_location && (
                <FormErrorMessage>{errors.class_location.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">课程简介</FormLabel>
              <Input
                id="description"
                {...register("description")}
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
