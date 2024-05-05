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
import {
  type ApiError,
  type CourseOut,
  type CourseUpdate,
  CoursesService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface EditItemProps {
  item: CourseUpdate
  isOpen: boolean
  onClose: () => void
}

const EditCourse: React.FC<EditItemProps> = ({ item, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<CourseUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: item,
  })

  const updateCourse = async (data: CourseUpdate) => {
    await CoursesService.coursesUpdateCourse({ id: item.id, requestBody: data })
  }

  const mutation = useMutation(updateCourse, {
    onSuccess: () => {
      showToast("Success!", "Course updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("Courses")
    },
  })

  const onSubmit: SubmitHandler<CourseUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>编辑课程</ModalHeader>
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
            <FormControl mt={4}>
              <FormLabel htmlFor="description">课程简介</FormLabel>
              <Input
                id="description"
                {...register("description")}
                placeholder="请输入课程简介"
                type="text"
                style={{ width: "400px", height: "150px" }}
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

export default EditCourse
