package com.softwareengineering.ebooking.dto;

import com.softwareengineering.ebooking.model.Location;
import com.softwareengineering.ebooking.model.Property;
import lombok.Data;

import java.util.Date;

@Data
public class UpdateListingDto {

    String title;
    String description;
    Location location;
    Float price;
    Property property;
    Integer maxGuests;
    String imageUrl;
    Boolean isAvailable;
    Date availableFrom;
    Integer stars;

}