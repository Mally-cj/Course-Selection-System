import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from "react-hook-form"
import {
//   Button,
  Modal,
//   Form,
//   Input,
//   FormInstance,
} from 'antd';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError, CommentCreate, CommentsService } from '../../client';
import useCustomToast from '../../hooks/useCustomToast';
interface AddCommentProps {
    isOpen: boolean
    onClose: () => void
    courseId: number
    studentId: number
}

const AddComment: React.FC<AddCommentProps> = ({isOpen, onClose, courseId, studentId }) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<CommentCreate>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            course_id: courseId,
            student_id: studentId,
            content: "",
        },
    })
    const addComment = async (data: CommentCreate) => {
        await CommentsService.commentsCreateComments({ requestBody: data })
    }

    const mutation = useMutation(addComment, {
        onSuccess: () => {
          showToast("Success!", "评论创建成功", "success")
          reset()
          onClose()
        },
        onError: (err: ApiError) => {
          const errDetail = err.body?.detail
          showToast("评论创建失败", `${errDetail}`, "error")
        },
        onSettled: () => {
          queryClient.invalidateQueries("comments")
        },
      })
    const onSubmit: SubmitHandler<CommentCreate> = (data) => {
        mutation.mutate({...data, course_id: courseId})
        handleOk()
    }
    
    // const [form] = Form.useForm();
    // useEffect(() => {
    //     onFormInstanceReady(form);
    //   }, []);
    
    //   const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 6 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 14 },
    //   },
    // };
    
    const handleOk = () => {
        // 将Model提交：
        console.log("onSubmit: ", "")
        
        // setIsModalOpen(false);
        onClose();
    };
    
    const handleCancel = () => {
        // setIsModalOpen(false);
        onClose();
        // onClose();
    };
    return (
        <>
        <Modal title="Basic Modal" open={isOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
            <FormControl isRequired isInvalid={!!errors.content} mt={4}>
              <FormLabel htmlFor="comment">评价内容</FormLabel>
              <Input
                id="comment"
                {...register("content", {
                  required: "评价不能为空.",
                })}
                placeholder="请输入评价"
                type="text"
              />
              {errors.content && (
                <FormErrorMessage>{errors.content.message}</FormErrorMessage>
              )}
            </FormControl>
        </Modal></>
    )
}

export default AddComment;