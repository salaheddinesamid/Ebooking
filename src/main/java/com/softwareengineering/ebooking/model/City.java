package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

@Entity
public class City {

    @Id
    @GeneratedValue
    @Column(name = "city_id")
    Integer id;

    @Column(name = "city_name")
    String cityName;

    @JoinColumn(name = "country_id")
    @ManyToOne
    Country country;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
