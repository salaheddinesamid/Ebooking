package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityRepository extends JpaRepository<Amenity,Integer> {
}
