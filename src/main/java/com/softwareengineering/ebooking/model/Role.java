package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

@Entity
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "role_id")
    Integer id;
    @Enumerated(EnumType.STRING)
    Roles roles;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }
}
