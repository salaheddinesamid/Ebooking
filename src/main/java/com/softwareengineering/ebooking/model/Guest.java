package com.softwareengineering.ebooking.model;


import jakarta.persistence.*;

@Entity
public class Guest {

    @Id
    @GeneratedValue

    @Column(name= "guest_id")
    Integer id;

    @JoinColumn(name = "user_id")
    @OneToOne
    User user;

    public Guest(User user){
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Guest(){

    }
}
