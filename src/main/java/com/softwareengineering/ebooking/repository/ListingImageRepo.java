package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Image;
import com.softwareengineering.ebooking.model.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingImageRepo extends JpaRepository<ListingImage,Integer> {
    List<ListingImage> findListingImageByListing_Id(Integer id);
}
