package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer discussionId;

    @OneToMany
    @JoinColumn(name = "messages")
    List<Message> messageList;

    @Column(name = "user1")
    Integer user1;

    @Column(name = "user2")
    Integer user2;
}

