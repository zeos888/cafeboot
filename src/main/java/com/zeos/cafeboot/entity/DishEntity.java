package com.zeos.cafeboot.entity;

import javax.persistence.*;

/**
 * Created by alxev on 12.07.2017.
 */
@Entity
public class DishEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer quantity;
    private Double price;

    @ManyToOne
    private DishTypeEntity dishType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public DishTypeEntity getDishType() {
        return dishType;
    }

    public void setDishType(DishTypeEntity dishType) {
        this.dishType = dishType;
    }
}
