package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.ListingPolicy;
import com.softwareengineering.ebooking.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingPolicyRepository extends JpaRepository<ListingPolicy, Integer> {
    List<ListingPolicy> findByListing_Id(Integer id); // Find ListingPolicies by listing ID
}
