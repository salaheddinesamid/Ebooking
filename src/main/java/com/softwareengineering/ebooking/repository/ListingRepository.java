package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListingRepository extends JpaRepository<Listing,Integer> {
    List<Listing> findAllByLocation(Location location);

    Optional<Listing> findById(Integer id);
}
