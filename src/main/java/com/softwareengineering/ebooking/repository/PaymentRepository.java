package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Integer> {
    void deleteByBooking_Id(Integer bookingId);
}
