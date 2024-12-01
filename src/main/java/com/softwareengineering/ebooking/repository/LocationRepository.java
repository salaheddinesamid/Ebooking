package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Integer> {
}
