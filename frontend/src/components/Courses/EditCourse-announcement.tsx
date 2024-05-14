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
  type AnnouncementCreate,
  AnnouncementsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface EditItemProps {
  item: CourseUpdate
  isOpen: boolean
  onClose: () => void
}

const EditCourseannouncement: React.FC<EditItemProps> = ({ item, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<AnnouncementCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    // defaultValues: item,
  })

  const updateCourse = async (data: AnnouncementCreate) => {
    await AnnouncementsService.EditcourseAndnnouncement({ requestBody: data })
  }

  const mutation = useMutation(updateCourse, {
    onSuccess: () => {
      showToast("Success!", "Course updated successfully.", "success")
      onClose()
      window.location.reload();
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
    if (data.course_time === item.class_time && data.course_location === item.class_location) {
      showToast("请调课", "上课时间和上课地点都没有变化。", "warning")
    } else {
      mutation.mutate(data)
    }
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
            <FormControl isRequired isInvalid={!!errors.course_time}>
              <FormLabel htmlFor="course_time">上课时间</FormLabel>
              <Input
                id="course_time"
                {...register("course_time", {
                  required: "上课时间不能为空.",
                })}
                placeholder="请输入上课时间"
                type="text"
                defaultValue={item.class_time}
              />
              {errors.course_time && (
                <FormErrorMessage>{errors.course_time.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.course_location} mt={4}>
              <FormLabel htmlFor="course_location">上课地点</FormLabel>
              <Input
                id="course_location"
                {...register("course_location", {
                  required: "上课地点不能为空.",
                })}
                placeholder="请输入上课地点"
                type="text"
                defaultValue={item.class_location}
              />
              {errors.course_time && (
                <FormErrorMessage>{errors.course_location.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isHidden>
              <Input
                id="course_id"
                {...register("course_id", {
                  value: item.id
                })}
                type="hidden"
              />
            </FormControl>
            <FormControl isHidden>
              <Input
                id="course_status"
                {...register("course_status", {
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

export default EditCourseannouncement
