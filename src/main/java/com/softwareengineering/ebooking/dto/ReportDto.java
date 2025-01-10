package com.softwareengineering.ebooking.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReportDto {

    Integer guestId;
    Integer listingId;
    String description;
    Date reportDate;
    String status;
}
