package com.softwareengineering.ebooking.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Join;

@Entity
@Getter
@Setter
public class ListingImage {
    @Id
    @GeneratedValue
    Integer id;

    @OneToOne
    @JoinColumn(name = "image_id")
    Image image;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    Listing listing;
}
