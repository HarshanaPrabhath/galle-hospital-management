package com.management.galle_hospital.Controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
<<<<<<< HEAD
import org.springframework.web.server.ResponseStatusException;
=======
>>>>>>> 8008e648ee9e711459d153e0b0163197dceabc84

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleUnreadableMessage(HttpMessageNotReadableException exception) {
        return error("Invalid request data. Please check the field values and try again.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        return error("Email or NIC already exists", HttpStatus.BAD_REQUEST);
    }

<<<<<<< HEAD
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatus(ResponseStatusException exception) {
        HttpStatus status = HttpStatus.valueOf(exception.getStatusCode().value());
        String message = exception.getReason() == null ? "Request failed" : exception.getReason();
        return error(message, status);
    }

=======
>>>>>>> 8008e648ee9e711459d153e0b0163197dceabc84
    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}
