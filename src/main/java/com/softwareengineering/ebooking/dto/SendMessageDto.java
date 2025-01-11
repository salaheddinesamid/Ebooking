package com.softwareengineering.ebooking.dto;

import lombok.Data;

@Data
public class SendMessageDto {

    Integer discussionId;
    MessageDto messageDto;
}
