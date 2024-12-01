package com.softwareengineering.ebooking.controller;


import com.softwareengineering.ebooking.model.ListingPolicy;
import com.softwareengineering.ebooking.model.Policy;
import com.softwareengineering.ebooking.repository.ListingPolicyRepository;
import com.softwareengineering.ebooking.repository.ListingRepository;
import com.softwareengineering.ebooking.service.ListingPolicyService;
import com.softwareengineering.ebooking.service.listing.ListingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/policies")
@CrossOrigin("http://localhost:8080")
public class PolicyController {

   private final ListingPolicyService listingPolicyService;

    public PolicyController(ListingPolicyRepository listingPolicyRepository, ListingRepository listingRepository, ListingService listingService, ListingPolicyService listingPolicyRepository1, ListingPolicyService listingPolicyService) {
        this.listingPolicyService = listingPolicyService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public List<Policy> getAllListingPolicy(@PathVariable Integer id){
        return listingPolicyService.getPoliciesByListingId(id);
    }
}
