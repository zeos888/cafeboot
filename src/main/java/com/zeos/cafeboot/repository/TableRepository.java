package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.AreaEntity;
import com.zeos.cafeboot.entity.OrderEntity;
import com.zeos.cafeboot.entity.TableEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface TableRepository extends CrudRepository<TableEntity, Integer> {
    List<TableEntity> findByArea(AreaEntity areaEntity);
    TableEntity findByAreaAndName(AreaEntity areaEntity, String name);
}
