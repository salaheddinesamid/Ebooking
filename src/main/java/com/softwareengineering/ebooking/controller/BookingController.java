package com.softwareengineering.ebooking.controller;


import com.softwareengineering.ebooking.dto.BookingDto;
import com.softwareengineering.ebooking.model.Booking;
import com.softwareengineering.ebooking.service.BookingService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("book")
    public Booking bookNow(@RequestBody BookingDto bookingDto){
        return bookingService.book(bookingDto);
    }

    @GetMapping("/guest_booking/{id}")
    public List<Booking> getBooking(@PathVariable Integer id){
        return bookingService.getBookingByGuest(id);
    }

    @DeleteMapping("cancel/{id}")
    public void cancelBooking(@PathVariable Integer id){
        bookingService.CancelBooking(id);
    }
}
