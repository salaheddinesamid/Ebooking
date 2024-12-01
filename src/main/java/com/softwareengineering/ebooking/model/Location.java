package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

@Entity
public class Location {

    @Id
    @GeneratedValue
    @Column(name = "location_id")
    Integer id;

    @JoinColumn(name = "country_id")
    @OneToOne
    Country country;

    @JoinColumn(name = "city_id")
    @OneToOne
    City city;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return country + "," + city;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    @Column(name = "street")
    String Street;
}
