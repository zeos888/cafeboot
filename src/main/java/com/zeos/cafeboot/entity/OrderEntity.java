package com.zeos.cafeboot.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by alxev on 12.07.2017.
 */
@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date startDate;
    private Date endDate;
    private Boolean open;
    private String name;

    @ManyToOne
    private TableEntity table;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public TableEntity getTable() {
        return table;
    }

    public void setTable(TableEntity table) {
        this.table = table;
    }

    public Boolean getOpen() {
        if (endDate == null){
            open = true;
        }
        open = false;
        return open;
    }

    public void setOpen(Boolean open) {
        if (open){
            this.endDate = null;
        }
        this.open = open;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
