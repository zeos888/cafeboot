package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.AreaEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface AreaRepository extends CrudRepository<AreaEntity, Integer>{
    List<AreaEntity> findByName(String name);
}
