package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Date getReportDate() {
        return reportDate;
    }

    public void setReportDate(Date reportDate) {
        this.reportDate = reportDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
