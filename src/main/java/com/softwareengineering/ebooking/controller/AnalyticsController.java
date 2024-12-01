package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.model.Booking;
import com.softwareengineering.ebooking.service.analytics.BookingAnalytics;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {


    private final BookingAnalytics bookingAnalytics;

    public AnalyticsController(BookingAnalytics bookingAnalytics) {
        this.bookingAnalytics = bookingAnalytics;
    }

    @GetMapping("/booking/{id}")
    public List<Booking> bookingList(@PathVariable Integer id){
        return bookingAnalytics.getAllBookingHostedByHost(id);
    }
}
