import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { ItemsService, UsersService, CoursesService, StudentsService, TeachersService } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface DeleteProps {
  type: string;
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const Delete: React.FC<DeleteProps> = ({ type, id, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const deleteEntity = async (id: number) => {
    if (type === "Item") {
      await ItemsService.itemsDeleteItem({ id: id });
    } else if (type === "User") {
      await UsersService.usersDeleteUser({ userId: id });
    } else if (type === "Course") {
      await CoursesService.coursesDeleteCourse({ id: id });
    } else if (type === "Student") {
      await StudentsService.studentsDeleteStudent({ id: id });
    } else if (type === "Teacher") {
      await TeachersService.teachersDeleteTeacher({ id: id });
    } else {
      throw new Error(`Unexpected type: ${type}`);
    }
  };

  const mutation = useMutation(deleteEntity, {
    onSuccess: () => {
      showToast(
        "Success",
        `The ${type.toLowerCase()} was deleted successfully.`,
        "success"
      );
      onClose();
    },
    onError: () => {
      showToast(
        "An error occurred.",
        `An error occurred while deleting the ${type.toLowerCase()}.`,
        "error"
      );
    },
    onSettled: () => {
      // Invalidate queries based on the type
      queryClient.invalidateQueries({
        predicate: query => query.queryKey.includes(type.toLowerCase())
      });
    },
  });

  const onSubmit = async () => {
    mutation.mutate(id);
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Delete {type}</AlertDialogHeader>
            <AlertDialogBody>
              {type === "User" && (
                <span>
                  All items associated with this user will also be <strong>permanently deleted.</strong>
                </span>
              )}
              Are you sure? You will not be able to undo this action.
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button variant="danger" type="submit" isLoading={isSubmitting}>
                Delete
              </Button>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isSubmitting}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Delete;
