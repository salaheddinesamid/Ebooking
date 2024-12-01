package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Policy {

    @Id
    @GeneratedValue
    @Column(name = "policy_id")
    Integer id;

    @Column(name = "description")
    String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
