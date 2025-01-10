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

    @OneToOne
    @JoinColumn(name = "sender")
    Sender sender;

    @OneToOne
    @JoinColumn(name = "receiver")
    Receiver receiver;

    @Column(name = "text_message")
    String textMessage;
    /*
    @OneToOne
    @JoinColumn(name = "receiver")
    User user;
    *
     */
}
