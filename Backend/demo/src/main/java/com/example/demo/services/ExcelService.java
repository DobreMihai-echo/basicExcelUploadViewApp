package com.example.demo.services;


import com.example.demo.helper.ExcelHelper;
import com.example.demo.model.DataModel;
import com.example.demo.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    DataRepository repository;

    public void addOneElement(DataModel dataModel) {
        repository.save(dataModel);
    }

    public void save(MultipartFile file) {
        try {
            List<DataModel> modelList = ExcelHelper.excelToData(file.getInputStream());
            repository.deleteAll();
            repository.saveAll(modelList);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel file:" + e.getMessage());
        }
    }

    public List<DataModel> getAllData() {
        return repository.findAll();
    }

    public DataModel getDataById(String id) {
        Integer myIntId = 0;
        try {
            myIntId = Integer.parseInt(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println("ID IS:" + myIntId + "STRING ID:" + id);
        return repository.getById(myIntId);
    }

    public DataModel updateData(String id,DataModel dataModel) {
        System.out.println("DATA:" + dataModel.toString());
        Integer myIntId = Integer.parseInt(id);
        DataModel objectToUpdate = repository.getById(myIntId);
        objectToUpdate.setTitle(dataModel.getTitle());
        objectToUpdate.setDescription(dataModel.getDescription());

        return repository.save(objectToUpdate);
    }

    public Boolean delete(String id) {
        try {
            repository.deleteById(Integer.parseInt(id));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
