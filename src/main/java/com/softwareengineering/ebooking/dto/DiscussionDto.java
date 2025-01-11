package com.softwareengineering.ebooking.dto;

import com.softwareengineering.ebooking.model.Receiver;
import com.softwareengineering.ebooking.model.Sender;
import lombok.Data;

import java.util.List;

@Data
public class DiscussionDto {

    private Integer discussionId;
    private List<MessageDto> messageDtoList;
    private Sender sender;
    private Receiver receiver;
}
