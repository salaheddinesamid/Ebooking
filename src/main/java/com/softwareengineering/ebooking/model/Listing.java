package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "listing_id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "location")
    private Location location;

    @Column(name = "price")
    private Float price;

    @OneToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @Column(name = "max_guests")
    private Integer maxGuests;

    @Column(name = "image")
    private String image;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "review")
    private Integer stars;


}
