
import { Button,Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface DisplayProps {
    record:{
        id:number,
        student_id:number,
        name:string,
        major:string,
        comment:string,
        comment_id:number,
    }
    isOpen: boolean; // 添加 isOpen 属性
    onClose: () => void;
}

const Display: React.FC<DisplayProps> = ({ record, isOpen, onClose }) => {
      console.log(record)
    if(record!=null){
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>评价详情</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        <p>序号: {record.id}</p>
                        <p>学号: {record.student_id}</p>
                        <p>姓名: {record.name}</p>
                        <p>学院: {record.major}</p>
                        <p>评论: {record.comment}</p>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        关闭
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )}else {
        return null; // 如果 record 为 null，则不渲染任何内容
    }
};

export default Display;