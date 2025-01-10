package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.repository.GuestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final GuestRepository guestRepository;


    public ResponseEntity<Object> sendMessage(
            Integer senderId,
            Integer receiverId
    ){

    }
}
