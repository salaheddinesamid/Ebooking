package com.softwareengineering.ebooking.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Sender{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer senderId;

    @OneToOne
    @JoinColumn(name = "senderId")
    User user;

}
