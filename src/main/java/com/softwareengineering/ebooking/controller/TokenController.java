package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.jwt.JwtUtilities;
import com.softwareengineering.ebooking.service.token.TokenServices;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/token")
public class TokenController {
    private final TokenServices tokenServices;

    public TokenController(JwtUtilities jwtUtilities, TokenServices tokenServices) {
        this.tokenServices = tokenServices;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("verify")
    public boolean verifyTokenExpiration(@RequestBody String token){
        return tokenServices.checkToken(token);
    }
}
