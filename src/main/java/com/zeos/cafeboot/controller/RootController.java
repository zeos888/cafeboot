package com.zeos.cafeboot.controller;

import com.zeos.cafeboot.entity.AreaEntity;
import com.zeos.cafeboot.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
@Controller
public class RootController {

    @Autowired
    private AreaRepository areaRepository;

    @RequestMapping("/")
    public String index(ModelMap modelMap){
        return "main";
    }

    @RequestMapping(value = "/areas", method = RequestMethod.GET)
    public @ResponseBody List<AreaEntity> getAreas(){
        List<AreaEntity> areas = (ArrayList<AreaEntity>) areaRepository.findAll();
        return areas;
    }
}
