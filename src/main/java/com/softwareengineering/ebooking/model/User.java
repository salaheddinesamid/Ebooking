package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone",nullable = true)
    private String phone;

    @Column(name = "profile_picture", nullable = true)
    private String profilePicture;

    @Column(name = "verified_status")
    private boolean verifiedStatus;

    @Column(name = "user_role")
    private String role;

    @Column(name = "national_id",nullable = true)
    private String nationalId;

    @Column(name = "password")
    private String password;

    // Parameterized constructor
    public User(String fullName, String email, String phone, boolean verifiedStatus) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.verifiedStatus = verifiedStatus;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean isVerifiedStatus() {
        return verifiedStatus;
    }

    public void setVerifiedStatus(boolean verifiedStatus) {
        this.verifiedStatus = verifiedStatus;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.getRole()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Adjust based on your needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Adjust based on your needs
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Adjust based on your needs
    }

    @Override
    public boolean isEnabled() {
        return true; // Adjust based on your needs
    }
}
