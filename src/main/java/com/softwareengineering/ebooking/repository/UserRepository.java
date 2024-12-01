package com.softwareengineering.ebooking.repository;


import com.softwareengineering.ebooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findUserByEmail(String email);
}
