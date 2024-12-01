package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest,Integer> {
    Optional<Guest> findByUser_Id(Integer id);
}
