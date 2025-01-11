package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.dto.MessageDto;
import com.softwareengineering.ebooking.model.Message;
import com.softwareengineering.ebooking.model.Receiver;
import com.softwareengineering.ebooking.model.Sender;
import com.softwareengineering.ebooking.repository.GuestRepository;
import com.softwareengineering.ebooking.repository.MessageRepository;
import com.softwareengineering.ebooking.repository.ReceiverRepository;
import com.softwareengineering.ebooking.repository.SenderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final SenderRepository senderRepository;

    private final ReceiverRepository receiverRepository;
    private final MessageRepository messageRepository;
    public MessageService(SenderRepository senderRepository, ReceiverRepository receiverRepository, MessageRepository messageRepository) {
        this.senderRepository = senderRepository;
        this.receiverRepository = receiverRepository;
        this.messageRepository = messageRepository;
    }


    public ResponseEntity<Object> sendMessage(
            MessageDto messageDto
    ){
        Message message = new Message();
        Sender sender = senderRepository.findById(messageDto.getSenderId()).get();
        Receiver receiver = receiverRepository.findById(messageDto.getReceiverId()).get();
        message.setTextMessage(messageDto.getText());
        message.setSender(sender);
        message.setReceiver(receiver);
        messageRepository.save(message);

        return new ResponseEntity<>("Message sent", HttpStatus.OK);
    }
}
