package com.zeos.cafeboot.controller;

import com.zeos.cafeboot.entity.AreaEntity;
import com.zeos.cafeboot.entity.TableEntity;
import com.zeos.cafeboot.repository.AreaRepository;
import com.zeos.cafeboot.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by alxev on 15.07.2017.
 */
@RestController
@RequestMapping("/manage")
public class ManagerController {
    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private TableRepository tableRepository;

    @RequestMapping("/addArea")
    public AreaEntity addArea(@RequestParam(name = "name") String name){
        if (areaRepository.findByName(name).size() > 0){
            return null;
        }
        AreaEntity areaEntity = new AreaEntity();
        areaEntity.setName(name);
        areaEntity.setOccupied(false);
        areaRepository.save(areaEntity);
        return areaEntity;
    }

    @RequestMapping("/updateArea/{id}")
    public AreaEntity updateAres(@PathVariable(name = "id") Integer id, @RequestParam(name = "name") String name){
        AreaEntity areaEntity = areaRepository.findOne(id);
        if (areaRepository.findOne(id) == null || areaRepository.findByName(name).size() > 0){
            return null;
        }
        areaEntity.setName(name);
        areaRepository.save(areaEntity);
        return areaEntity;
    }

    @RequestMapping("/removeArea/{id}")
    public int removeArea(@PathVariable(name = "id") Integer id){
        if (areaRepository.findOne(id) != null && tableRepository.findByArea(areaRepository.findOne(id)).size() <= 0){
            areaRepository.delete(id);
            return 1;
        }
        return 0;
    }

    @RequestMapping("/addTable")
    public TableEntity addTable(@RequestParam(name = "name") String name, @RequestParam(name = "areaId") Integer areaId){
        if (tableRepository.findByAreaAndName(areaRepository.findOne(areaId), name) != null){
            return null;
        }
        TableEntity tableEntity = new TableEntity();
        tableEntity.setName(name);
        tableEntity.setArea(areaRepository.findOne(areaId));
        tableEntity.setOccupied(false);
        tableRepository.save(tableEntity);
        return tableEntity;
    }

    @RequestMapping("/updateTable/{id}")
    public TableEntity updateTable(@PathVariable(name = "id") Integer id, @RequestParam(name = "name") String name){
        TableEntity tableEntity = tableRepository.findOne(id);
        if (tableEntity != null && tableRepository.findByAreaAndName(tableEntity.getArea(), name) == null){
            tableEntity.setName(name);
            tableRepository.save(tableEntity);
            return tableEntity;
        }
        return null;
    }

    @RequestMapping("/removeTable/{id}")
    public int removeTable(@PathVariable(name = "id") Integer id){
        if (tableRepository.findOne(id) != null){
            tableRepository.delete(id);
            return 1;
        }
        return 0;
    }
}
