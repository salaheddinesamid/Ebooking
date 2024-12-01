package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HostAnalytics {

    @Id
    @GeneratedValue
    Integer id;

    @ManyToOne
    @JoinColumn(name = "host_id")
    Host host;

    @Column(name = "revenue")
    Integer revenue;

    @Column(name = "total_properties")
    Integer property;

    @Column(name = "reviews")
    Integer reviews;
}
