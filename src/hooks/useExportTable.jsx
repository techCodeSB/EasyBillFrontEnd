import * as XLSX from 'xlsx';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';
import useMyToaster from './useMyToaster';

const useExportTable = () => {
  const toast = useMyToaster()

  // downloaExcel................
  const downloadExcel = (data, filename) => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      toast("Download faild! " + error, 'error')
    }
  }

  // Copy Table.....................
  const copyTable = async (tableId) => {
    const elTable = document.querySelector('#' + tableId);
    if (!elTable) {
      console.error(`Table with id ${tableId} not found.`);
      return;
    }

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


  // Print table..............
  const printTable = (tableRef, title) => {
    const tableHTML = tableRef.current.outerHTML;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid gray;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h3>${title}</h3>
          ${tableHTML}
        </body>
      </html>
    `);

    // Close the document and trigger the print dialog
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  }


  // Download PDF..........
  const exportPdf = (title, data) => {
    const styles = StyleSheet.create({
      page: {
        padding: 10
      },
      header: {
        margin: 10,
        padding: 10,
        width: "100%",
        textAlign: 'center'
      },
      td: {
        fontSize: 10,
        padding: 5
      },
      th: {
        fontSize: 12,
        padding: 5,
        fontWeight: 'bold'
      }
    });

    try {
      const obj = data && data[0];
      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text>{title}</Text>
            </View>
            <Table>
              <TH style={{ backgroundColor: '#3B82F6', color: 'white' }}>
                {
                  obj && Object.keys(obj).map((el, _) => {
                    return <TD style={styles.th} key={_}>{el}</TD>
                  })
                }
              </TH>
              {
                data && data.map((d, _) => {
                  console.log(d)
                  return (
                    <TR key={_}>
                      {
                        Object.keys(d).map((key, index) => (
                          <TD key={index} style={styles.td}>{d[key]}</TD>
                        ))
                      }
                    </TR>
                  )
                })
              }
            </Table>
          </Page>
        </Document>
      );

      return MyDocument;
    } catch (error) {
      console.log(error)
    }
  }


  return { copyTable, downloadExcel, printTable, exportPdf };


}


export default useExportTable;
