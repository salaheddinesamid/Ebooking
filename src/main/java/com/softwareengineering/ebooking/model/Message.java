package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer messageId;

    @Column(name = "sender")
    Integer senderId;

    @Column(name = "receiver")
    Integer receiverId;

    @Column(name = "text_message")
    String textMessage;
    /*
    @OneToOne
    @JoinColumn(name = "receiver")
    User user;
    *
     */
}
