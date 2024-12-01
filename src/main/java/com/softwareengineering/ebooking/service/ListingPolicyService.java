package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.model.ListingPolicy;
import com.softwareengineering.ebooking.model.Policy;
import com.softwareengineering.ebooking.repository.ListingPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingPolicyService {

    @Autowired
    private ListingPolicyRepository listingPolicyRepository;

    public List<Policy> getPoliciesByListingId(Integer id) {
        List<ListingPolicy> listingPolicies = listingPolicyRepository.findByListing_Id(id);
        return listingPolicies.stream()
                .map(ListingPolicy::getPolicy)
                .collect(Collectors.toList());
    }
}
