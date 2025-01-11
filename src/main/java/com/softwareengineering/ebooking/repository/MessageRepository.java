package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Integer> {
}
