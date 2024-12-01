package com.softwareengineering.ebooking.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Payment {
    @Id
    @GeneratedValue
    @Column(name = "payment_id")
    Integer id;

    @JoinColumn(name = "booking_id")
    @OneToOne
    Booking booking;

    @Column(name = "amount")
    Integer amount;

    @Column(name = "payment_date")
    Date paymentDate;

    @JoinColumn(name = "payment_method")
    @OneToOne
    PaymentMethod paymentMethod;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
