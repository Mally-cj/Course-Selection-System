import {
  Button,
  Container,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import type React from "react"

import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount: React.FC = () => {
  const confirmationModal = useDisclosure()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          删除账户
        </Heading>
        <Text>
          永远删除你的信息和与你的账户相关的所有内容。
        </Text>
        <Button variant="danger" mt={4} onClick={confirmationModal.onOpen}>
          确认删除
        </Button>
        <DeleteConfirmation
          isOpen={confirmationModal.isOpen}
          onClose={confirmationModal.onClose}
        />
      </Container>
    </>
  )
}
export default DeleteAccount
