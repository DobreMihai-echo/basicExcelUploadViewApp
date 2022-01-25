package com.example.demo.repository;

import com.example.demo.model.DataModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DataRepository extends JpaRepository<DataModel,Integer> {


    List<DataModel> findDataByTitle(String title);
}
