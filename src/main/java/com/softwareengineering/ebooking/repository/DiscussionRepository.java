package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Discussion;
import com.softwareengineering.ebooking.model.Receiver;
import com.softwareengineering.ebooking.model.Sender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion,Integer> {
    boolean existsBySenderAndReceiver(Sender sender, Receiver receiver);
    Discussion findBySenderAndReceiver(Sender sender, Receiver receiver);
}
