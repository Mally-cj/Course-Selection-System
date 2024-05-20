import React from 'react';
import { Button } from '@chakra-ui/react';
import * as XLSX from 'xlsx';

function ExportToexcel({ data, filename, buttonText }) {
    const exportToExcel = () => {
        const modifiedData = data.map((data) => ({
            'FullName': data.name,
            'Email': data.email,
            'ID': data.id,
            'Title': data.title,
            'College': data.college
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


export default ExportToexcel;