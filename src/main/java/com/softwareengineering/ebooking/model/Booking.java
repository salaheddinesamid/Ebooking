package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CollectionId;

import java.util.Date;

@Entity
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue
    @Column(name = "booking_id")
    Integer id;

    @JoinColumn(name = "guest_id")
    @ManyToOne
    Guest guest;

    @JoinColumn(name = "listing_id")
    @OneToOne
    Listing listing;

    @Column(name = "check_in_date")
    Date checkInDate;

    @Column(name = "check_out_date")
    Date checkOutDate;

    @Column(name = "status")
    String status;
    @Column(name = "amount")
    Integer amount;

    @Column(name = "total_nights")
    Integer totalNights;


    @ManyToOne
    @JoinColumn(name = "hosted_by")
    Host host;

    @Column(name = "reference_id")
    String referenceId;
}
