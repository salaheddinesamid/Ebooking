package com.softwareengineering.ebooking.dto;

import com.softwareengineering.ebooking.model.Host;
import com.softwareengineering.ebooking.model.Listing;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ListingResponseDto {
    Listing listing;
    Host host;

    public ListingResponseDto(Listing listing, Host host){
        this.listing = listing;
        this.host = host;
    }
}
