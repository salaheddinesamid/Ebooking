package com.softwareengineering.ebooking.service.listing;

import com.softwareengineering.ebooking.dto.ReportDto;
import com.softwareengineering.ebooking.dto.UpdateListingDto;
import com.softwareengineering.ebooking.model.Guest;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.Location;
import com.softwareengineering.ebooking.model.Report;
import com.softwareengineering.ebooking.repository.GuestRepository;
import com.softwareengineering.ebooking.repository.ListingRepository;
import com.softwareengineering.ebooking.repository.ReportRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final GuestRepository guestRepository;
    private final ReportRepository reportRepository;

    public ListingService(ListingRepository listingRepository, GuestRepository guestRepository, ReportRepository reportRepository) {
        this.listingRepository = listingRepository;
        this.guestRepository = guestRepository;
        this.reportRepository = reportRepository;
    }

    public List<Listing> getAllListing(){
        return listingRepository.findAll();
    }
    public List<Listing> returnAvailableListing(Location location, Date date){
        return listingRepository.findAllByLocation(location);
    }

    public ResponseEntity<Object> removeListing(
            Integer listingId
    ){
        if (listingRepository.existsById(listingId)){
            listingRepository.deleteById(listingId);

        }
        return new ResponseEntity<>("Listing removed", HttpStatus.OK);
    }

    public ResponseEntity<Object> updateListing(
            Integer listingId,
            UpdateListingDto updateListingDto
    ){
        Listing listing = listingRepository.findById(listingId).get();
        listing.setIsAvailable(updateListingDto.getIsAvailable());
        listing.setImage(updateListingDto.getImageUrl());
        listing.setDescription(updateListingDto.getDescription());
        listing.setPrice(updateListingDto.getPrice());
        listing.setLocation(updateListingDto.getLocation());
        listingRepository.save(listing);
        return new ResponseEntity<>("Listing updated",HttpStatus.OK);
    }

    public Listing getListingById(Integer id){
        return listingRepository.findById(id).get();
    }


    public ResponseEntity<Object> reportListing(
            Integer listingId,
            ReportDto reportDto
    ){
        Report report = new Report();
        Listing listing = listingRepository.findById(listingId).get();
        Guest guest = guestRepository.findById(reportDto.getGuestId()).get();
        report.setReportDate(reportDto.getReportDate());
        report.setListing(listing);
        report.setGuest(guest);
        report.setReportDate(reportDto.getReportDate());
        report.setReason(reportDto.getDescription());
        reportRepository.save(report);
        return new ResponseEntity<>("Report submitted",HttpStatus.OK);
    }
}
