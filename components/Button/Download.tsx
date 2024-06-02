import React from "react";

import * as XLSX from "xlsx";

import Button from "../UI/Button";

interface IDownloadButtonProps {
  data: any[];
  fileName: string;
}

const DownloadButton = ({ data, fileName }: IDownloadButtonProps) => {
  return (
    <Button
      variant="primary"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      Download
    </Button>
  );
};

export default DownloadButton;
