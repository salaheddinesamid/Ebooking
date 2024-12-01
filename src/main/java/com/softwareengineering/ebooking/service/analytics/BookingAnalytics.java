package com.softwareengineering.ebooking.service.analytics;


import com.softwareengineering.ebooking.model.Booking;
import com.softwareengineering.ebooking.model.Host;
import com.softwareengineering.ebooking.repository.BookingRepository;
import com.softwareengineering.ebooking.repository.HostRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingAnalytics {


    private final BookingRepository bookingRepository;
    private final HostRepository hostRepository;

    public BookingAnalytics(BookingRepository bookingRepository, HostRepository hostRepository, HostRepository hostRepository1) {
        this.bookingRepository = bookingRepository;
        this.hostRepository = hostRepository1;
    }

    public List<Booking> getAllBookingHostedByHost(Integer id){
        Host host = hostRepository.findByUser_Id(id).get();
        return bookingRepository.findAllByHost_Id(host.getId());
    }
}
