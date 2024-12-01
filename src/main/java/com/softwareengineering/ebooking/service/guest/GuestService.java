package com.softwareengineering.ebooking.service.guest;

import com.softwareengineering.ebooking.model.Guest;
import com.softwareengineering.ebooking.model.Listing;
import com.softwareengineering.ebooking.model.User;
import com.softwareengineering.ebooking.repository.GuestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GuestService {
     public final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public ResponseEntity<Object> registration(User user){
        if (guestRepository.existsById(user.getId())){
            return new ResponseEntity<>("Guest already exists", HttpStatus.ALREADY_REPORTED);
        }else{
            Guest guest = new Guest(user);
            guestRepository.save(guest);
            return new ResponseEntity<>("Guest registred",HttpStatus.OK);
        }
    }
}
