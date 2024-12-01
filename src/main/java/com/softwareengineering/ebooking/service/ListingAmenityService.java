package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.model.Amenity;
import com.softwareengineering.ebooking.model.ListingAmenity;
import com.softwareengineering.ebooking.repository.ListingAmenityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingAmenityService {
    private final ListingAmenityRepository listingAmenityRepository;

    public ListingAmenityService(ListingAmenityRepository listingAmenityRepository) {
        this.listingAmenityRepository = listingAmenityRepository;
    }

    public List<Amenity> getAmenityByListing(Integer id){
        List<ListingAmenity> listingAmenities = listingAmenityRepository.findListingAmenitiesByListing_Id(id);
        return listingAmenities.stream()
                .map(ListingAmenity::getAmenity)
                .collect(Collectors.toList());

    }
}
