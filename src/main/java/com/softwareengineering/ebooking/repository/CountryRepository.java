package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country,Integer> {
}
