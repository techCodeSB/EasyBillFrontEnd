import * as XLSX from 'xlsx';

const useExportTable = () => {
    const downloadExcel = (data, filename) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, filename);
    }

    const copyTable = async (tableId) => {
        const elTable = document.querySelector('#' + tableId);
        if (!elTable) {
            console.error(`Table with id ${tableId} not found.`);
            return;
        }
    
        try {
            // Creating a temporary textarea to copy the table content
            const textArea = document.createElement('textarea');
            textArea.value = tableToText(elTable); // Convert the table to a text representation
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices
    
            // Using Clipboard API to copy text
            await navigator.clipboard.writeText(textArea.value);
            console.log('Table copied to clipboard.');
    
            // Remove the temporary textarea
            document.body.removeChild(textArea);
        } catch (e) {
            console.error('Failed to copy table:', e);
        }
    };
    
    // Helper function to convert the table to a string format
    const tableToText = (table) => {
        let text = '';
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            cells.forEach((cell, index) => {
                text += cell.textContent.trim();
                if (index < cells.length - 1) text += '\t'; // Tab between columns
            });
            text += '\n'; // New line after each row
        });
        return text;
    };
    




    return copyTable;
    

}


export default useExportTable;
