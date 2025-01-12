package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Integer> {
    List<Message> findAllBySenderIdAndReceiverIdOrReceiverIdAndSenderId(Integer senderId, Integer receiverId, Integer receiverId2, Integer senderId2);
}
