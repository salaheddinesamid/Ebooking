package com.softwareengineering.ebooking.dto;

import lombok.Data;

import java.util.List;

@Data
public class DiscussionDto {

    private Integer discussionId;
    private List<MessageDto> messageDtoList;
    private List<Integer> userIds;
}
