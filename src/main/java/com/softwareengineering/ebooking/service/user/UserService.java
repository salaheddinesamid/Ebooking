package com.softwareengineering.ebooking.service.user;

import com.softwareengineering.ebooking.dto.LoginDto;
import com.softwareengineering.ebooking.jwt.BearerToken;
import com.softwareengineering.ebooking.jwt.JwtUtilities;
import com.softwareengineering.ebooking.model.User;
import com.softwareengineering.ebooking.repository.UserRepository;
import com.softwareengineering.ebooking.service.guest.GuestService;
import com.softwareengineering.ebooking.service.host.HostService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtilities jwtUtilities;
    private final HostService hostService;
    private final GuestService guestService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    public ResponseEntity<Object> newUser(User user){
        String myRole = user.getRole();
        user.setRole(myRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        if(myRole.equals("host")){
            
            hostService.newHost(user);
        }else if(myRole.equals("guest")){
            guestService.registration(user);
        }
        String token = jwtUtilities.generateToken(user.getEmail(),myRole);
        return new ResponseEntity<>(new BearerToken(token , "Bearer ",user),HttpStatus.OK);
    }

    public ResponseEntity<Object> authentication(LoginDto loginDto) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Retrieve user details
            User user = userRepository.findUserByEmail(authentication.getName());
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            String role = user.getRole();
            String token = jwtUtilities.generateToken(user.getEmail(), role);

            return new ResponseEntity<>(new BearerToken(token, "Bearer",user), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials for user: {}", loginDto.getEmail(), e);
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        } catch (DisabledException e) {
            logger.warn("Disabled account for user: {}", loginDto.getEmail());
            return new ResponseEntity<>("Account disabled. Please contact support.", HttpStatus.UNAUTHORIZED);
        } catch (LockedException e) {
            logger.warn("Locked account for user: {}", loginDto.getEmail());
            return new ResponseEntity<>("Account locked. Please contact support.", HttpStatus.UNAUTHORIZED);
        } catch (UsernameNotFoundException e) {
            logger.warn("User not found: {}", loginDto.getEmail());
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", loginDto.getEmail(), e);
            return new ResponseEntity<>("Authentication failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Other methods...
}