package com.softwareengineering.ebooking.dto;


import com.softwareengineering.ebooking.model.Image;
import com.softwareengineering.ebooking.model.Listing;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ListingDetails {
    Listing listing;
    Image image;
}
