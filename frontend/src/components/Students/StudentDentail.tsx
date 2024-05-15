// StudentDetail.tsx
import React from 'react';
import { useParams } from '@tanstack/react-router';

interface StudentDetailProps {
    // 如果需要从外部传递额外的props，可以在这里定义
}

const StudentDetail: React.FC<StudentDetailProps> = () => {
    const params = useParams<'studentId'>(); // 使用 TypeScript 确保参数类型正确
    const studentId = params.studentId;

    return (
        <div>
            <h1>Student Details</h1>
            <p>Here will be details for student ID: {studentId}</p>
            {/* 实际应用中这里将显示更多根据 student 信息渲染的内容 */}
        </div>
    );
}

export default StudentDetail;
