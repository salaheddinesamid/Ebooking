package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.dto.DiscussionDto;
import com.softwareengineering.ebooking.dto.MessageDto;
import com.softwareengineering.ebooking.dto.SendMessageDto;
import com.softwareengineering.ebooking.model.*;
import com.softwareengineering.ebooking.repository.*;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ChatService {


    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    public ChatService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }


    // Create first discussion between two users:
    public ResponseEntity<DiscussionDto> createDiscussion(DiscussionDto discussionDto) {
        List<Integer> userIds = discussionDto.getUserIds();

        // Fetch users from the repository
        List<User> users = userIds.stream()
                .map(userId -> {
                    try {
                        return userRepository.findById(userId)
                                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
                    } catch (ChangeSetPersister.NotFoundException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

        // Set response DTO
        DiscussionDto responseDto = new DiscussionDto();
        responseDto.setUserIds(userIds);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }


    public ResponseEntity<Object> sendMessage(
            SendMessageDto sendMessageDto
    ){
        //Discussion discussion = discussionRepository.findById(sendMessageDto.getDiscussionId()).get();
        Message message = new Message();
        message.setSenderId(sendMessageDto.getMessageDto().getSenderId());
        message.setReceiverId(sendMessageDto.getMessageDto().getReceiverId());
        message.setTextMessage(sendMessageDto.getMessageDto().getText());
        messageRepository.save(message);
        return new ResponseEntity<>("Message sent", HttpStatus.OK);
    }

    // Get discussion between two users:
    public ResponseEntity<DiscussionDto> getDiscussion(
            Integer senderId,
            Integer receiverId
    ){

        DiscussionDto discussionDto = new DiscussionDto();
        List<Message> messages = messageRepository.findAllBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId,receiverId,receiverId,senderId);
        List<MessageDto> messageDtoList = messages
                .stream()
                        .map(message -> {
                            MessageDto messageDto = new MessageDto();
                            messageDto.setText(message.getTextMessage());
                            messageDto.setSenderId(message.getSenderId());
                            messageDto.setReceiverId(message.getReceiverId());
                            return messageDto;
                        }).toList();
        discussionDto.setMessageDtoList(messageDtoList);
        return new ResponseEntity<>(discussionDto,HttpStatus.OK);
    }
}
