package com.softwareengineering.ebooking.service.token;

import com.softwareengineering.ebooking.jwt.JwtUtilities;
import org.springframework.stereotype.Service;

@Service
public class TokenServices {

    private final JwtUtilities jwtUtilities;

    public TokenServices(JwtUtilities jwtUtilities) {
        this.jwtUtilities = jwtUtilities;
    }

    public boolean checkToken(String token){
        return jwtUtilities.validateToken(token);
    }
}
