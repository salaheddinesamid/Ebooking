package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Discussion;
import com.softwareengineering.ebooking.model.Receiver;
import com.softwareengineering.ebooking.model.Sender;
import com.softwareengineering.ebooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion,Integer> {
    boolean existsByUsers(List<User> users);
    Discussion findByUsers(List<User> users);
}
