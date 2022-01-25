package com.example.demo.helper;

import com.example.demo.model.DataModel;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {


    public static List<DataModel> excelToData(InputStream is) {
        try {
            Workbook workbook = WorkbookFactory.create(is);

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            List<DataModel> models = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellIterator = currentRow.iterator();

                DataModel dataModel = new DataModel();

                int cellIdx = 0;

                while (cellIterator.hasNext()) {
                    Cell currentCell = cellIterator.next();

                    switch (cellIdx) {
                        case 0:
                            dataModel.setTitle(currentCell.getStringCellValue());
                            break;

                        case 1:
                            dataModel.setDescription(currentCell.getStringCellValue());
                            break;

                        case 2:
                            dataModel.setPublished(currentCell.getBooleanCellValue());
                            break;

                        default:
                            break;
                    }

                    cellIdx++;
                }

                models.add(dataModel);
            }

            workbook.close();

            return models;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
