package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Message;
import com.softwareengineering.ebooking.model.Receiver;
import com.softwareengineering.ebooking.model.Sender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Integer> {
    List<Message> findAllBySenderAndReceiver(Sender sender, Receiver receiver);
}
