package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report,Integer> {
}
