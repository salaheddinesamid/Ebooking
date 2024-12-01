package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Host {
    @Id
    @GeneratedValue
    @Column(name = "host_id")
    Integer id;

    @JoinColumn(name = "user_id")
    @OneToOne
    User user;

    public Host(User user){
        this.user = user;
    }

    public Host() {

    }

}
