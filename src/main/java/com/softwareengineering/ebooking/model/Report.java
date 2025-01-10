package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue
    @Column(name = "report_id")
    Integer id;
    @JoinColumn(name = "reporter_id")
    @OneToOne
    Guest guest;

    @JoinColumn(name = "listing_id")
    @OneToOne
    Listing listing;

    @Column(name = "report_reason")
    String reason;

    @Column(name = "report_date")
    Date reportDate;

    @Column(name = "report_status")
    String status;
}
