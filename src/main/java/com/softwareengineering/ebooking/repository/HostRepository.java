package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.Host;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface HostRepository extends JpaRepository<Host,Integer> {
    Optional<Host> findByUser_Id(Integer id);
}
