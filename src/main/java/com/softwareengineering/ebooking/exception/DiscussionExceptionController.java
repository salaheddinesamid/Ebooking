package com.softwareengineering.ebooking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DiscussionExceptionController {

    @ExceptionHandler(value = DiscussionAlreadyExistsException.class)
    public ResponseEntity<Object> exception(
            DiscussionAlreadyExistsException e
    ){
        return new ResponseEntity<>("Discussion cannot be created as it already exists", HttpStatus.ALREADY_REPORTED);
    }
}
