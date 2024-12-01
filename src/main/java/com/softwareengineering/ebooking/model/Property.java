package com.softwareengineering.ebooking.model;


import jakarta.persistence.*;

@Entity
public class Property {

    @Id
    @GeneratedValue

    @Column(name = "property_id")
    Integer id;
    @Column(name = "property_type")
    String propertyType;

    @JoinColumn(name = "location_id")
    @OneToOne
    Location location;

    @Column(name = "bedrooms")
    Integer bedRooms;

    @Column(name = "bathrooms")
    Integer bathRooms;

    @Column(name = "accommodates")
    Integer accommodates;

    @Column(name = "size")
    Float size;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Integer getBedRooms() {
        return bedRooms;
    }

    public void setBedRooms(Integer bedRooms) {
        this.bedRooms = bedRooms;
    }

    public Integer getBathRooms() {
        return bathRooms;
    }

    public void setBathRooms(Integer bathRooms) {
        this.bathRooms = bathRooms;
    }

    public Integer getAccommodates() {
        return accommodates;
    }

    public void setAccommodates(Integer accommodates) {
        this.accommodates = accommodates;
    }

    public Float getSize() {
        return size;
    }

    public void setSize(Float size) {
        this.size = size;
    }
}
