package com.softwareengineering.ebooking.dto;

import com.softwareengineering.ebooking.model.Host;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class BookingDto {
    Integer guestId;
    Integer listingId;
    Date checkInDate;
    Date checkOutDate;
    Integer amount;
    Integer totalNights;
    String referenceId;
    Integer hostId;
}
