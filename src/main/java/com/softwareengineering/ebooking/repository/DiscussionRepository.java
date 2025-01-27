package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussion,Integer> {
}
