package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.dto.DiscussionDto;
import com.softwareengineering.ebooking.dto.MessageDto;
import com.softwareengineering.ebooking.dto.SendMessageDto;
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
    public ResponseEntity<DiscussionDto> createDiscussion(
            DiscussionDto discussionDto
    ){
        /*
        Sender sender = senderRepository.findById(senderId).get();
        Receiver receiver = receiverRepository.findById(receiverId).get();
        */
        List<Integer> users = new ArrayList<>();
        users.add(discussionDto.getUserIds().get(0));
        users.add(discussionDto.getUserIds().get(1));
        boolean discussionExists = discussionRepository.existsByUsers(
                users
        );
        try {

            // Check if the discussion already exists:
            if (!discussionExists){
                Discussion discussion = new Discussion();
                discussion.setUsers(users);
                discussionRepository.save(discussion);
            }
            discussionDto.setUsers(users);
            return new ResponseEntity<>(discussionDto,
                    HttpStatus.OK);
        }catch(DiscussionAlreadyExistsException e){
            throw new DiscussionAlreadyExistsException();
        }
    }

    public ResponseEntity<Object> sendMessage(
            SendMessageDto sendMessageDto
    ){
        Discussion discussion = discussionRepository.findById(sendMessageDto.getDiscussionId()).get();
        Message message = new Message();
        Sender sender = senderRepository.findById(sendMessageDto.getMessageDto().getSenderId()).get();
        Receiver receiver = receiverRepository.findById(sendMessageDto.getMessageDto().getReceiverId()).get();
        List<User> users = new ArrayList<>();
        users.add(sender.getUser());
        users.add(receiver.getUser());
        message.setTextMessage(sendMessageDto.getMessageDto().getText());
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
        List<Integer> users = new ArrayList<>();
        users.add(sender.getUser().getId());
        users.add(receiver.getUser().getId());
        Discussion discussion = discussionRepository.findByUsers(
                users
        );
        DiscussionDto discussionDto = new DiscussionDto();
        List<Message> messages = messageRepository.findAllBySenderAndReceiver(sender,receiver);
        List<MessageDto> messageDtoList = messages
                .stream()
                        .map(message -> {
                            MessageDto messageDto = new MessageDto();
                            messageDto.setText(message.getTextMessage());
                            messageDto.setSenderId(message.getSender().getSenderId());
                            messageDto.setReceiverId(message.getReceiver().getReceiverId());
                            return messageDto;
                        }).toList();
        discussionDto.setUserIds(users);
        discussionDto.setMessageDtoList(messageDtoList);
        return new ResponseEntity<>(discussionDto,HttpStatus.OK);
    }
}
