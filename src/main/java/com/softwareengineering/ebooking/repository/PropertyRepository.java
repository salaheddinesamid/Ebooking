package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property,Integer> {
}
