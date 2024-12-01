package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findAllByHost_Id(Integer id);
    List<Booking> findAllByGuest_Id(Integer id);
}
