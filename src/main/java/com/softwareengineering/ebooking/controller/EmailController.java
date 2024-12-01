package com.softwareengineering.ebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("email/test")
public class EmailController {
    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("")
    public void sendEmail(@RequestBody String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("samidsalaheddine2@gmail.com");
        message.setTo("samidbachelor@gmail.com");
        message.setSubject("Welcome message");
        message.setText(text);
        emailSender.send(message);
    }
}
