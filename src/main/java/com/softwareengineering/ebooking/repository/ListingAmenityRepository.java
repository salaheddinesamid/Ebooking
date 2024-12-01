package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Amenity;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.ListingAmenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingAmenityRepository extends JpaRepository<ListingAmenity,Integer> {
    List<ListingAmenity> findListingAmenitiesByListing_Id(Integer id);
}
