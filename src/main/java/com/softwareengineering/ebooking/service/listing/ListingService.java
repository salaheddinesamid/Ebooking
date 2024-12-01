package com.softwareengineering.ebooking.service.listing;

import com.softwareengineering.ebooking.dto.ListingResponseDto;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.ListingHost;
import com.softwareengineering.ebooking.model.Location;
import com.softwareengineering.ebooking.repository.ListingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public List<Listing> getAllListing(){
        return listingRepository.findAll();
    }
    public List<Listing> returnAvailableListing(Location location){
        return listingRepository.findAllByLocation(location);
    }

    public Listing getListingById(Integer id){
        return listingRepository.findById(id).get();
    }
}
