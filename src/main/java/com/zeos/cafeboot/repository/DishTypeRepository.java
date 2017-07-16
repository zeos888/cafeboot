package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.DishTypeEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface DishTypeRepository extends CrudRepository<DishTypeEntity, Integer> {
    List<DishTypeEntity> findByName(String name);
}
