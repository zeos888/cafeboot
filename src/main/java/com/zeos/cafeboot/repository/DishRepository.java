package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.DishEntity;
import com.zeos.cafeboot.entity.DishTypeEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface DishRepository extends CrudRepository<DishEntity, Integer> {
    List<DishEntity> findByName (String name);
    List<DishEntity> findByDishType (DishTypeEntity dishTypeEntity);
}
