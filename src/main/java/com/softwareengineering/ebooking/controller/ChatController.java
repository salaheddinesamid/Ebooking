package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.dto.DiscussionDto;
import com.softwareengineering.ebooking.dto.SendMessageDto;
import com.softwareengineering.ebooking.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @PostMapping("/new")
    public ResponseEntity<DiscussionDto> createNewDiscussion(
            @RequestBody DiscussionDto discussionDto
    ){
        return chatService.createDiscussion(discussionDto);
    }

    @PostMapping("/send_message")
    public ResponseEntity<Object> sendMessage(
            @RequestBody SendMessageDto sendMessageDto
            ){
        return chatService.sendMessage(sendMessageDto);
    }
}
