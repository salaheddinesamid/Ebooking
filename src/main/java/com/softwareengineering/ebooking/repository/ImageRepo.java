package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image,Integer> {
}
