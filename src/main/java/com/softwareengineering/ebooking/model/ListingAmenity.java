package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

@Entity
public class ListingAmenity {

    @Id
    @GeneratedValue
    @Column(name = "listing_amenity_id")
    Integer id;

    public Amenity getAmenity() {
        return amenity;
    }

    public void setAmenity(Amenity amenity) {
        this.amenity = amenity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    @JoinColumn(name = "amenity_id")
    @OneToOne
    Amenity amenity;

    @JoinColumn(name = "listing_id")
    @ManyToOne
    Listing listing;
}
