package com.management.galle_hospital.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Read-only view of the pharmacy queue. The queue is owned by the external pharmacy
 * token system; this service just relays its {@code /api/queue-flow-all} response to
 * the frontend display screens. Nothing here creates or updates queue data.
 */
@Service
public class PharmacyQueueService {

    private static final int DISPLAY_COUNT = 4;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestClient restClient;

    public PharmacyQueueService(
            @Value("${pharmacy.queue.base-url:https://pharmacy-token-system.linkmecareq.com}") String baseUrl) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
    }

    /** now/next/next2 for all four pharmacy displays. */
    public ResponseEntity<?> getQueueFlowAll() {
        try {
            String body = restClient.get()
                    .uri("/api/queue-flow-all")
                    .retrieve()
                    .body(String.class);
            JsonNode payload = body == null ? null : objectMapper.readTree(body);
            if (payload != null && payload.has("displays")) {
                return ResponseEntity.ok(payload);
            }
        } catch (Exception ignored) {
            // Upstream unreachable or unparseable — fall through to an all-zero board.
        }
        return ResponseEntity.ok(Map.of("displays", allEmptyDisplays()));
    }

    private Map<String, Object> allEmptyDisplays() {
        Map<String, Object> displays = new LinkedHashMap<>();
        for (int display = 1; display <= DISPLAY_COUNT; display++) {
            Map<String, Object> flow = new LinkedHashMap<>();
            flow.put("now", 0);
            flow.put("next", 0);
            flow.put("next2", 0);
            displays.put(String.valueOf(display), flow);
        }
        return displays;
    }
}
