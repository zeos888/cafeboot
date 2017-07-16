package com.zeos.cafeboot.repository;

import com.zeos.cafeboot.entity.DishEntity;
import com.zeos.cafeboot.entity.OrderEntity;
import com.zeos.cafeboot.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alxev on 12.07.2017.
 */
public interface OrderItemRepository extends CrudRepository<OrderItemEntity, Integer> {
    List<OrderItemEntity> findByOrder(OrderEntity orderEntity);
    OrderItemEntity findByOrderAndDish(OrderEntity orderEntity, DishEntity dishEntity);
    @Query("select case when count(id) > 0 then true else false end from OrderItemEntity where dish = ?1")
    Boolean existsByDish(DishEntity dishEntity);
}
