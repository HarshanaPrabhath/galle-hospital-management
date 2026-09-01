package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Service.PharmacyQueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Read-only pharmacy queue endpoint consumed by the frontend display screens.
 */
@RestController
@RequiredArgsConstructor
public class PharmacyQueueController {

    private final PharmacyQueueService pharmacyQueueService;

    @GetMapping("/api/queue-flow-all")
    public ResponseEntity<?> getQueueFlowAll() {
        return pharmacyQueueService.getQueueFlowAll();
    }
}
