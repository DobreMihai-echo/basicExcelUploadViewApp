package com.example.demo.controllers;


import com.example.demo.helper.ExcelHelper;
import com.example.demo.model.DataModel;
import com.example.demo.responses.ExcelResponseMessage;
import com.example.demo.services.ExcelService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/excel")
public class DataController {

    @Autowired
    ExcelService excelService;

    @PostMapping("/uploadByElement")
    public ResponseEntity<ExcelResponseMessage> uploadOneElement(@RequestBody DataModel dataModel) {
        String message = "";
        try {
            excelService.addOneElement(dataModel);
            message = "Element: "  +dataModel.getTitle() +" added successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new ExcelResponseMessage(message));
        } catch (Exception e) {
            message = "Error inserting element " + e.getMessage();
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ExcelResponseMessage(message));
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<ExcelResponseMessage> uploadFile(@RequestParam("file")MultipartFile file) {
        String message = "";
        String nameOfFile = file.getOriginalFilename();

        if (!FilenameUtils.isExtension(nameOfFile,"xlsx")) {
            message = "Uploaded file: " + file.getOriginalFilename() + " is not an excel. Please upload a valid format";
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ExcelResponseMessage(message));
        }

        try {
            excelService.save(file);

            message = "Uploaded the file successfully " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ExcelResponseMessage(message));
        } catch (Exception e) {
            message = "File couldn't be uploaded " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ExcelResponseMessage(message));
        }
    }

    @GetMapping("/data")
    public ResponseEntity<List<DataModel>> getAllData() {
        try {
            List<DataModel> datas = excelService.getAllData();

            if (datas.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(datas);
            }

            return ResponseEntity.status(HttpStatus.OK).body(datas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/data/{id}")
    public ResponseEntity<DataModel> getDataById(@PathVariable(name = "id") String id) {
        return ResponseEntity.status(HttpStatus.OK).body(excelService.getDataById(id));
    }

    @PutMapping("/upload/{id}")
    public ResponseEntity<DataModel> updateData(@PathVariable(name="id") String id, @RequestBody DataModel data) {
        return ResponseEntity.status(HttpStatus.OK).body(excelService.updateData(id, data));
    }

    @DeleteMapping("/data/delete/{id}")
    public ResponseEntity<ExcelResponseMessage> deleteData(@PathVariable(name="id") String id) {
        String message = "";
        try {
            excelService.delete(id);
            message = "Row was deleted successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new ExcelResponseMessage(message));
        } catch (Exception e) {
            message = "Row couldn't be deleted";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ExcelResponseMessage(message));
        }
    }
}
