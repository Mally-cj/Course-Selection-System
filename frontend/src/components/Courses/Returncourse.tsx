import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from "@chakra-ui/react";
import React from "react";

interface ReturnCourseProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReturnCourse: React.FC<ReturnCourseProps> = ({ isOpen, onClose }) => {
  // 可以在此处编写处理返回到页面/courses逻辑的代码

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>返回到课程页面</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 在此处添加组件内容 */}
          确定要返回到课程页面吗？
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button colorScheme="blue" ml={3} onClick={() => {
            window.location.href = "/courses";
            onClose();
          }}>确定</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReturnCourse;
