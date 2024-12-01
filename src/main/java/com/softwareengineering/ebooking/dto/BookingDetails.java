package com.softwareengineering.ebooking.dto;

import com.softwareengineering.ebooking.model.Booking;
import com.softwareengineering.ebooking.model.Guest;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BookingDetails {
    User user;
    Listing listing;
    Booking booking;
}
