package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class ListingHost {
    @Id
    @GeneratedValue
    Integer id;

    @OneToOne
    @JoinColumn(name = "listing_id")
    Listing listing;

    @ManyToOne
    @JoinColumn(name = "host_id")
    Host host;
}
