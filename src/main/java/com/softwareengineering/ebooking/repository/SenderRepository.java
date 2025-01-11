package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Sender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SenderRepository extends JpaRepository<Sender,Integer> {
}
