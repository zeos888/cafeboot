package com.zeos.cafeboot.controller;

import com.zeos.cafeboot.entity.DishEntity;
import com.zeos.cafeboot.entity.DishTypeEntity;
import com.zeos.cafeboot.repository.DishRepository;
import com.zeos.cafeboot.repository.DishTypeRepository;
import com.zeos.cafeboot.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by alxev on 13.07.2017.
 */
@RestController
@RequestMapping("/kitchen")
public class KitchenController {
    @Autowired
    private DishTypeRepository dishTypeRepository;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @RequestMapping("/addDishType")
    public DishTypeEntity addDishType(@RequestParam(name = "name") String name){
        List<DishTypeEntity> found = dishTypeRepository.findByName(name);
        if (found.size() > 0) {
            return null;
        }
        DishTypeEntity dishTypeEntity = new DishTypeEntity();
        dishTypeEntity.setName(name);
        dishTypeRepository.save(dishTypeEntity);
        return dishTypeEntity;
    }

    @RequestMapping("/editDishType/{id}")
    public DishTypeEntity editDishType(@PathVariable(name = "id") Integer id, @RequestParam(name = "name") String name){
        DishTypeEntity dishTypeEntity = dishTypeRepository.findOne(id);
        if (dishTypeEntity != null){
            dishTypeEntity.setName(name);
            dishTypeRepository.save(dishTypeEntity);
            return dishTypeEntity;
        }
        return null;
    }

    @RequestMapping("/removeDishType/{id}")
    public int removeDishType(@PathVariable(name = "id") Integer id){
        DishTypeEntity dishTypeEntity = dishTypeRepository.findOne(id);
        if (dishTypeEntity != null && dishRepository.findByDishType(dishTypeEntity).size() == 0){
            dishTypeRepository.delete(dishTypeEntity);
            return 1;
        }
        return 0;
    }

    @RequestMapping("/addDish")
    public DishEntity addDish(@RequestParam(name = "name") String name, @RequestParam(name = "dishTypeId") Integer dishTypeId, @RequestParam(name = "price") Double price, @RequestParam(name = "quantity", required = false, defaultValue = "0") Integer quantity){
        List<DishEntity> found = dishRepository.findByName(name);
        if (found.size() > 0 || dishTypeRepository.findOne(dishTypeId) == null) {
            return null;
        }
        DishEntity dishEntity = new DishEntity();
        dishEntity.setDishType(dishTypeRepository.findOne(dishTypeId));
        dishEntity.setName(name);
        dishEntity.setPrice(price);
        dishEntity.setQuantity(quantity);
        dishRepository.save(dishEntity);
        return dishEntity;
    }

    @RequestMapping("/editDish/{id}")
    public DishEntity editDish(@PathVariable(name = "id") Integer id, @RequestParam(name = "name", required = false) String name, @RequestParam(name = "dishTypeId", required = false) Integer dishTypeId, @RequestParam(name = "price", required = false) Double price, @RequestParam(name = "quantity",required = false) Integer quantity){
        DishEntity dishEntity = dishRepository.findOne(id);
        if (dishEntity != null){
            if (name != null) dishEntity.setName(name);
            if (price != null) dishEntity.setPrice(price);
            if (dishTypeId != null && dishTypeRepository.findOne(dishTypeId) != null) dishEntity.setDishType(dishTypeRepository.findOne(dishTypeId));
            if (quantity !=null) dishEntity.setQuantity(quantity);
            dishRepository.save(dishEntity);
            return dishEntity;
        }
        return null;
    }

    @RequestMapping("/removeDish/{id}")
    public int removeDish(@PathVariable(name = "id") Integer id){
        DishEntity dishEntity = dishRepository.findOne(id);
        if (dishEntity != null && !orderItemRepository.existsByDish(dishEntity)){
            dishRepository.delete(dishEntity);
            return 1;
        }
        return 0;
    }
}
