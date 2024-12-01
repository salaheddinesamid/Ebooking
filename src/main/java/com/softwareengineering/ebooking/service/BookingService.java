package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.dto.BookingDto;
import com.softwareengineering.ebooking.model.*;
import com.softwareengineering.ebooking.repository.*;
import com.softwareengineering.ebooking.service.host.HostService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Properties;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final GuestRepository guestRepository;
    private final ListingRepository listingRepository;
    private final ListingHostRepo listingHostRepo;
    private final TransactionRepository transactionRepository;
    private  final PaymentRepository paymentRepository;
    private final HostRepository hostRepository;

    public BookingService(BookingRepository bookingRepository, GuestRepository guestRepository, ListingRepository listingRepository, ListingHostRepo listingHostRepo, TransactionRepository transactionRepository, HostService hostService, PaymentRepository paymentRepository, HostRepository hostRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.guestRepository = guestRepository;
        this.listingRepository = listingRepository;
        this.listingHostRepo = listingHostRepo;
        this.transactionRepository = transactionRepository;
        this.paymentRepository = paymentRepository;
        this.hostRepository = hostRepository;
    }



    public Booking book(BookingDto bookingDto){
        Guest guest = guestRepository.findByUser_Id(bookingDto.getGuestId()).get();
        Listing listing = listingRepository.findById(bookingDto.getListingId()).get();
        Booking booking = new Booking();
        Transaction transaction = new Transaction();
        Payment payment = new Payment();
        Host host = hostRepository.findById(bookingDto.getHostId()).get();
        booking.setGuest(guest);
        booking.setListing(listing);
        booking.setAmount(bookingDto.getAmount());
        booking.setCheckInDate(bookingDto.getCheckInDate());
        booking.setCheckOutDate(bookingDto.getCheckOutDate());
        booking.setTotalNights(bookingDto.getTotalNights());
        booking.setReferenceId(bookingDto.getReferenceId());
        booking.setHost(host);
        bookingRepository.save(booking);
        listing.setIsAvailable(false);
        listingRepository.save(listing);
        payment.setBooking(booking);
        payment.setAmount(booking.getAmount());
        paymentRepository.save(payment);
        transaction.setBooking(booking);
        transaction.setAmount(booking.getAmount());
        transaction.setPayment(payment);
        transaction.setUser(booking.getGuest().getUser());
        transactionRepository.save(transaction);
        hostRepository.save(host);

        return booking;
    }

    @Transactional
    public void CancelBooking(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId).get();
        Listing listing = listingRepository.findById(booking.getListing().getId()).get();

        transactionRepository.deleteByBooking_Id(bookingId);
        paymentRepository.deleteByBooking_Id(bookingId);
        bookingRepository.deleteById(bookingId);

        listing.setIsAvailable(true);
        listingRepository.save(listing);
    }

    @Transactional
    public List<Booking> getBookingByGuest(Integer userId){
        Guest guest = guestRepository.findByUser_Id(userId).get();
        return bookingRepository.findAllByGuest_Id(guest.getId());
    }
}
