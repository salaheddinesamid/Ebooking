package com.softwareengineering.ebooking.repository;

import com.softwareengineering.ebooking.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Integer> {
}
