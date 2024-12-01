package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.dto.LoginDto;
import com.softwareengineering.ebooking.model.User;
import com.softwareengineering.ebooking.service.MailService;
import com.softwareengineering.ebooking.service.user.UserService;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    public UserController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }
    @PostMapping("register")
    public ResponseEntity<Object> register(@RequestBody User user){
        return userService.newUser(user);
    }


    @PostMapping("authentication")
    public ResponseEntity<Object> authenticate(@RequestBody LoginDto loginDto) throws MessagingException {
        return userService.authentication(loginDto);
    }

    @GetMapping("test")
    public String test(){
        return "Test test";
    }
}
