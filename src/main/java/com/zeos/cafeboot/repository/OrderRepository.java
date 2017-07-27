package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.OrderEntity;
import com.zeos.cafeboot.entity.TableEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface OrderRepository extends CrudRepository<OrderEntity, Integer> {
    List<OrderEntity> findByTable(TableEntity tableEntity);
    List<OrderEntity> findByTableAndOpenEquals(TableEntity tableEntity, Boolean open);
    List<OrderEntity> findByTableAndEndDateIsNull(TableEntity tableEntity);
}
