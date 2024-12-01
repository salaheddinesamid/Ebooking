package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {

    void deleteByBooking_Id(Integer id);
}
