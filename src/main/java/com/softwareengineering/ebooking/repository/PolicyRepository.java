package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy,Integer> {
}
