package com.softwareengineering.ebooking.dto;

import lombok.Data;

@Data
public class MessageDto {
    private Integer senderId;
    private Integer receiverId;
    private String text;
}
