package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Receiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer receiverId;

    @OneToOne
    @JoinColumn(name = "user")
    User user;
}
