package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.dto.DiscussionDto;
import com.softwareengineering.ebooking.dto.MessageDto;
import com.softwareengineering.ebooking.exception.DiscussionAlreadyExistsException;
import com.softwareengineering.ebooking.model.*;
import com.softwareengineering.ebooking.repository.DiscussionRepository;
import com.softwareengineering.ebooking.repository.MessageRepository;
import com.softwareengineering.ebooking.repository.ReceiverRepository;
import com.softwareengineering.ebooking.repository.SenderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final SenderRepository senderRepository;
    private final DiscussionRepository discussionRepository;
    private final ReceiverRepository receiverRepository;
    private final MessageRepository messageRepository;
    public ChatService(SenderRepository senderRepository, DiscussionRepository discussionRepository, ReceiverRepository receiverRepository, MessageRepository messageRepository) {
        this.senderRepository = senderRepository;
        this.discussionRepository = discussionRepository;
        this.receiverRepository = receiverRepository;
        this.messageRepository = messageRepository;
    }


    // Create first discussion between two users:
    public ResponseEntity<Object> createDiscussion(
            Integer senderId,
            Integer receiverId
    ){
        Sender sender = senderRepository.findById(senderId).get();
        Receiver receiver = receiverRepository.findById(receiverId).get();
        List<User> users = new ArrayList<>();
        users.add(sender.getUser());
        users.add(receiver.getUser());
        boolean discussionExists = discussionRepository.existsByUsers(
                users
        );
        try {
            if (!discussionExists){
                Discussion discussion = new Discussion();
                discussion.setUsers(users);
                discussionRepository.save(discussion);
            }
            return new ResponseEntity<>("Discussion Created!!",
                    HttpStatus.OK);
        }catch(DiscussionAlreadyExistsException e){
            throw new DiscussionAlreadyExistsException();
        }
    }

    public ResponseEntity<Object> sendMessage(
            Integer discussionId,
            MessageDto messageDto
    ){
        Discussion discussion = discussionRepository.findById(discussionId).get();
        Message message = new Message();
        Sender sender = senderRepository.findById(messageDto.getSenderId()).get();
        Receiver receiver = receiverRepository.findById(messageDto.getReceiverId()).get();
        List<User> users = new ArrayList<>();
        users.add(sender.getUser());
        users.add(receiver.getUser());
        message.setTextMessage(messageDto.getText());
        message.setSender(sender);
        message.setReceiver(receiver);
        discussion.setUsers(users);
        messageRepository.save(message);
        return new ResponseEntity<>("Message sent", HttpStatus.OK);
    }

    // Get discussion between two users:
    public ResponseEntity<DiscussionDto> getDiscussion(
            Integer senderId,
            Integer receiverId
    ){

        Sender sender = senderRepository.findById(senderId).get();
        Receiver receiver = receiverRepository.findById(receiverId).get();
        List<User> users = new ArrayList<>();
        users.add(sender.getUser());
        users.add(receiver.getUser());
        Discussion discussion = discussionRepository.findByUsers(
                users
        );

    }
}
