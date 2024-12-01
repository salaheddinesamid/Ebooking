package com.softwareengineering.ebooking.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Transaction {

    @Id
    @GeneratedValue
    @Column(name = "transaction_id")
    Integer id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    User user;

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    @JoinColumn(name = "booking_id")
    @OneToOne
    Booking booking;

    @Column(name = "amount")
    Integer amount;

    @Column(name = "date")
    Date date;

    @JoinColumn(name = "payment_id")
    @OneToOne
    Payment payment;
}
