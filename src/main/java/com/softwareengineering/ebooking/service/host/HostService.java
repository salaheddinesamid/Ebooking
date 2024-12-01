package com.softwareengineering.ebooking.service.host;

import com.softwareengineering.ebooking.model.Host;
import com.softwareengineering.ebooking.model.User;
import com.softwareengineering.ebooking.repository.HostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HostService {

    private final HostRepository hostRepository;

    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    public ResponseEntity<Object> newHost(User user){
        Host host = new Host(user);
        hostRepository.save(host);
        return new ResponseEntity<>("Host is registered", HttpStatus.OK);
    }
}
