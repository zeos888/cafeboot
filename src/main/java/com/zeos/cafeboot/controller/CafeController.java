package com.zeos.cafeboot.controller;

import com.zeos.cafeboot.entity.*;
import com.zeos.cafeboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * Created by alxev on 15.07.2017.
 */
@RestController
@RequestMapping("/cafe")
public class CafeController {
    @Autowired
    private AreaRepository areaRepository;
    @Autowired
    private TableRepository tableRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private DishTypeRepository dishTypeRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @RequestMapping("/listAreas")
    public List<AreaEntity> listAreas(){
        return (List<AreaEntity>) areaRepository.findAll();
    }

    @RequestMapping("/area/{id}")
    public AreaEntity getArea(@PathVariable(name = "id") Integer id){
        return areaRepository.findOne(id);
    }

    @RequestMapping("/listAreaTables/{id}")
    public List<TableEntity> listAreaTables(@PathVariable(name = "id") Integer id){
        return tableRepository.findByArea(areaRepository.findOne(id));
    }

    @RequestMapping("/table/{id}")
    public TableEntity getTable(@PathVariable(name = "id") Integer id){
        return tableRepository.findOne(id);
    }

    @RequestMapping("/occupyArea/{id}")
    public int occupyArea(@PathVariable(name = "id") Integer id){
        if (areaRepository.findOne(id) != null && !areaRepository.findOne(id).getOccupied()){
            List<TableEntity> tables = tableRepository.findByArea(areaRepository.findOne(id));
            for (TableEntity tableEntity : tables){
                if (tableEntity.getOccupied()){
                    return 0;
                }
            }
            for (TableEntity tableEntity : tables){
                tableEntity.setOccupied(true);
                tableRepository.save(tableEntity);
            }
            AreaEntity areaEntity = areaRepository.findOne(id);
            areaEntity.setOccupied(true);
            areaRepository.save(areaEntity);
            return 1;
        }
        return 0;
    }

    @RequestMapping("/occupyTable/{id}")
    public int occupyTable(@PathVariable(name = "id") Integer id){
        TableEntity tableEntity = tableRepository.findOne(id);
        if (tableEntity != null && !tableEntity.getOccupied()){
            tableEntity.setOccupied(true);
            tableRepository.save(tableEntity);
            return 1;
        }
        return 0;
    }

    @RequestMapping("/listOrders")
    public List<OrderEntity> listOrders(){
        return (List<OrderEntity>) orderRepository.findAll();
    }

    @RequestMapping("/listTableOrders/{id}")
    public List<OrderEntity> listTableOrders(@PathVariable(name = "id") Integer id){
        return orderRepository.findByTableAndOpen(tableRepository.findOne(id), true);
    }

    @RequestMapping("/listOrderItems/{id}")
    public List<OrderItemEntity> listOrderItems(@PathVariable(name = "id") Integer id){
        return orderItemRepository.findByOrder(orderRepository.findOne(id));
    }

    @RequestMapping("/addOrder/{id}")
    public OrderEntity addOrder(@PathVariable(name = "id") Integer id, @RequestParam(name = "name", required = false, defaultValue = "noname") String name){
        if (tableRepository.findOne(id) == null){
            return null;
        }
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setStartDate(new Date());
        if (name == null || "noname".equals(name)){
            name = "noname" + orderEntity.getId();
        }
        orderEntity.setName(name);
        orderEntity.setTable(tableRepository.findOne(id));
        orderEntity.setOpen(true);
        orderRepository.save(orderEntity);
        return orderEntity;
    }

    @RequestMapping("/listDishTypes")
    public List<DishTypeEntity> listDishTypes(){
        return (List<DishTypeEntity>) dishTypeRepository.findAll();
    }

    @RequestMapping("/listTypeDishes/{id}")
    public List<DishEntity> listTypeDishes(@PathVariable(name = "id") Integer id){
        return dishRepository.findByDishType(dishTypeRepository.findOne(id));
    }

    @RequestMapping("/addOrderItem/{id}")
    public OrderItemEntity addOrderItem(@PathVariable(name = "id") Integer id, @RequestParam(name = "dishId") Integer dishId){
        if (orderRepository.findOne(id) != null && orderRepository.findOne(id).getOpen()){
            OrderEntity orderEntity = orderRepository.findOne(id);
            if (dishRepository.findOne(dishId) != null){
                DishEntity dishEntity = dishRepository.findOne(dishId);
                OrderItemEntity orderItemEntity = orderItemRepository.findByOrderAndDish(orderEntity, dishEntity);
                if (orderItemEntity == null){
                    orderItemEntity = new OrderItemEntity();
                    orderItemEntity.setOrder(orderEntity);
                    orderItemEntity.setDish(dishEntity);
                    orderItemEntity.setQuantity(0);
                }
                Integer available = dishEntity.getQuantity();
                if (available <= 0){
                    return null;
                }
                dishEntity.setQuantity(available - 1);
                orderItemEntity.setQuantity(orderItemEntity.getQuantity() + 1);
                dishRepository.save(dishEntity);
                orderItemRepository.save(orderItemEntity);
                return orderItemEntity;
            }
            return null;
        }
        return null;
    }

    @RequestMapping("/incrementOrderItem/{id}")
    public OrderItemEntity incrementOrderItem(@PathVariable(name = "id") Integer id, @RequestParam(name = "sign", required = false, defaultValue = "plus") String sign){
        OrderItemEntity orderItemEntity = orderItemRepository.findOne(id);
        if (orderItemEntity != null){
            DishEntity dishEntity = orderItemEntity.getDish();
            if (dishEntity != null && dishEntity.getQuantity() >= 1){
                dishEntity.setQuantity(dishEntity.getQuantity() - 1);
                orderItemEntity.setQuantity(orderItemEntity.getQuantity() + 1);
                dishRepository.save(dishEntity);
                orderItemRepository.save(orderItemEntity);
                return orderItemEntity;
            }
            return null;
        }
        return null;
    }

    @RequestMapping("/closeOrder/{id}")
    public List<OrderItemEntity> closeOrder(@PathVariable(name = "id") Integer id){
        OrderEntity orderEntity = orderRepository.findOne(id);
        if (orderEntity != null && orderEntity.getOpen()){
            orderEntity.setOpen(false);
            return orderItemRepository.findByOrder(orderEntity);
        }
        return null;
    }
}
