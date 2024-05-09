import React from 'react';
import { Button } from '@chakra-ui/react';
import * as XLSX from 'xlsx';

function Exporttexcel({ data, filename, buttonText }) {
    const exportToExcel = () => {
        const modifiedData = data.map((data) => ({
            '序号': data.id,
            '课程编号': data.course_id,
            '学号': data.student_id,
            '姓名': data.name,
            '邮箱': data.email,
            '学院': data.major,
        }));
        const ws = XLSX.utils.json_to_sheet(modifiedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, filename);
    };

    return (
        <div>
            <Button onClick={exportToExcel}>{buttonText}</Button>
        </div>
    );
}


export default Exporttexcel;