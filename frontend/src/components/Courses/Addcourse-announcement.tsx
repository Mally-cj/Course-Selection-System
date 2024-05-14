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

import { type ApiError,  AnnouncementsService, AnnouncementService, type AnnouncementCreate} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddCourseannuncementProps {
  isOpen: boolean
  id: number;
  onClose: () => void
}

const AddCourseannuncement: React.FC<AddCourseannuncementProps> = ({ id,isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      // name: "",
      // description: "",
      course_status: "",
      course_time:"",
      course_location: "",
    },
  })

  const addCourse = async (data: AnnouncementCreate) => {
    await AnnouncementsService.Createannouncement({ requestBody: data })
  }

  const mutation = useMutation(addCourse, {
    onSuccess: () => {
      showToast("Success!", "Course created successfully.", "success")
      reset()
      onClose()
      window.location.reload();
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries("courses")
    // },
  })

  const onSubmit: SubmitHandler<AnnouncementCreate> = (data) => {
    console.log(data)
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
          <ModalHeader>添加课程公告</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.content} mt={4}>
              <FormLabel htmlFor="content">公告内容</FormLabel>
              <Input
                id="content"
                {...register("content", {
                  required: "公告内容不能为空.",
                })}
                placeholder="请输入公告内容"
                type="text"
                style={{ width: "400px", height: "150px" }}
              />
              {errors.content && (
                <FormErrorMessage>{errors.content.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isHidden>
              <Input
                id="course_id"
                {...register("course_id", {
                  value: id
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

export default AddCourseannuncement
