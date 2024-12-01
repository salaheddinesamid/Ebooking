package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.model.Host;
import com.softwareengineering.ebooking.repository.ListingHostRepo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/host")
public class HostController {

    private final ListingHostRepo listingHostRepo;

    public HostController(ListingHostRepo listingHostRepo) {
        this.listingHostRepo = listingHostRepo;
    }

    @GetMapping("/{id}")
    public Host getHostByListingId(@PathVariable Integer id){
        return listingHostRepo.findListingHostByListing_Id(id).get().getHost();
    }
}
