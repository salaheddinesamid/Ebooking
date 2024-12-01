package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.model.Amenity;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.service.ListingAmenityService;
import com.softwareengineering.ebooking.service.listing.ListingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/listing")
public class ListingController {

    private final ListingService listingService;
    private final ListingAmenityService listingAmenityService;

    public ListingController(ListingService listingService, ListingAmenityService listingAmenityService) {
        this.listingService = listingService;
        this.listingAmenityService = listingAmenityService;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("")
    public List<Listing> getAll(){
        return listingService.getAllListing();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{listingId}")
    public Listing getListing(@PathVariable Integer listingId){
        return listingService.getListingById(listingId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("amenities/{listingId}")
    public List<Amenity> getAmenities(@PathVariable Integer listingId){
        return listingAmenityService.getAmenityByListing(listingId);
    }
}
