package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Host;
import com.softwareengineering.ebooking.model.ListingHost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListingHostRepo extends JpaRepository<ListingHost,Integer> {
    Optional<ListingHost> findListingHostByListing_Id(Integer id);
}
