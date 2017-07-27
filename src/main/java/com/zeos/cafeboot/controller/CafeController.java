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

    @RequestMapping("/dishType/{id}")
    public DishTypeEntity getDishType(@PathVariable(name = "id") Integer id){
        return dishTypeRepository.findOne(id);
    }

    @RequestMapping("/dish/{id}")
    public DishEntity getDish(@PathVariable(name = "id") Integer id){
        return dishRepository.findOne(id);
    }

    @RequestMapping("/occupyArea/{id}")
    public AreaEntity occupyArea(@PathVariable(name = "id") Integer id){
        AreaEntity areaEntity = areaRepository.findOne(id);
        if (areaEntity != null && !areaEntity.getOccupied()){
            List<TableEntity> tables = tableRepository.findByArea(areaEntity);
            for (TableEntity tableEntity : tables){
                if (tableEntity.getOccupied()){
                    return areaEntity;
                }
            }
            for (TableEntity tableEntity : tables){
                tableEntity.setOccupied(true);
                tableRepository.save(tableEntity);
            }
            areaEntity.setOccupied(true);
            areaRepository.save(areaEntity);
        }
        return areaEntity;
    }

    @RequestMapping("/releaseArea/{id}")
    public AreaEntity releaseArea(@PathVariable(name = "id") Integer id){
        AreaEntity areaEntity = areaRepository.findOne(id);
        if (areaEntity != null && areaEntity.getOccupied()){
            List<TableEntity> tables = tableRepository.findByArea(areaEntity);
            for (TableEntity tableEntity : tables){
                if (tableEntity.getOccupied()){
                    return areaEntity;
                }
            }
            areaEntity.setOccupied(false);
            areaRepository.save(areaEntity);
        }
        return areaEntity;
    }

    @RequestMapping("/occupyTable/{id}")
    public TableEntity occupyTable(@PathVariable(name = "id") Integer id){
        TableEntity tableEntity = tableRepository.findOne(id);
        if (tableEntity != null && !tableEntity.getOccupied()){
            tableEntity.setOccupied(true);
            tableRepository.save(tableEntity);
        }
        return tableEntity;
    }

    @RequestMapping("/listOrders")
    public List<OrderEntity> listOrders(){
        return (List<OrderEntity>) orderRepository.findAll();
    }

    @RequestMapping("/listTableOrders/{id}")
    public List<OrderEntity> listTableOrders(@PathVariable(name = "id") Integer id){
        return orderRepository.findByTableAndEndDateIsNull(tableRepository.findOne(id));
    }

    @RequestMapping("/order/{id}")
    public OrderEntity getOrder(@PathVariable(name = "id") Integer id){
        return orderRepository.findOne(id);
    }

    @RequestMapping("/releaseTable/{id}")
    public TableEntity releaseTable(@PathVariable(name = "id") Integer id){
        TableEntity tableEntity = tableRepository.findOne(id);
        if (tableEntity != null && tableEntity.getOccupied() && orderRepository.findByTableAndEndDateIsNull(tableRepository.findOne(id)).size() <= 0){
            tableEntity.setOccupied(false);
            tableRepository.save(tableEntity);
        }
        return tableEntity;
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
        OrderEntity orderEntity = orderRepository.findOne(id);
        if (orderEntity != null && orderEntity.getOpen()){
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
            if (dishEntity != null && "plus".equals(sign) && dishEntity.getQuantity() >= 1){
                dishEntity.setQuantity(dishEntity.getQuantity() - 1);
                orderItemEntity.setQuantity(orderItemEntity.getQuantity() + 1);
                dishRepository.save(dishEntity);
                orderItemRepository.save(orderItemEntity);
            } else if (dishEntity != null && !"plus".equals(sign) && orderItemEntity.getQuantity() >= 1){
                dishEntity.setQuantity(dishEntity.getQuantity() + 1);
                orderItemEntity.setQuantity(orderItemEntity.getQuantity() - 1);
                dishRepository.save(dishEntity);
                if (orderItemEntity.getQuantity() <= 0){
                    orderItemRepository.delete(orderItemEntity);
                    return null;
                } else {
                    orderItemRepository.save(orderItemEntity);
                }
            }
        }
        return orderItemEntity;
    }

    @RequestMapping("/checkOrder/{id}")
    public List<OrderItemEntity> checkOrder(@PathVariable(name = "id") Integer id){
        OrderEntity orderEntity = orderRepository.findOne(id);
        if (orderEntity != null && orderEntity.getOpen()){
            orderEntity.setOpen(false);
            orderRepository.save(orderEntity);
            return orderItemRepository.findByOrder(orderEntity);
        }
        return null;
    }

    @RequestMapping("/closeOrder/{id}")
    public OrderEntity closeOrder(@PathVariable(name = "id") Integer id){
        OrderEntity orderEntity = orderRepository.findOne(id);
        if (orderEntity != null && !orderEntity.getOpen() && orderEntity.getEndDate() == null){
            orderEntity.setEndDate(new Date());
            orderRepository.save(orderEntity);
            return orderEntity;
        }
        return null;
    }

    @RequestMapping("/cancelOrder/{id}")
    public OrderEntity cancelOrder(@PathVariable(name = "id") Integer id){
        OrderEntity orderEntity = orderRepository.findOne(id);
        if (orderEntity != null){
            List<OrderItemEntity> list = orderItemRepository.findByOrder(orderEntity);
            for (OrderItemEntity orderItemEntity : list){
                DishEntity dishEntity = orderItemEntity.getDish();
                dishEntity.setQuantity(dishEntity.getQuantity() + orderItemEntity.getQuantity());
                orderItemRepository.delete(orderItemEntity);
                dishRepository.save(dishEntity);
            }
            orderRepository.delete(orderEntity);
        }
        return orderEntity;
    }
}
