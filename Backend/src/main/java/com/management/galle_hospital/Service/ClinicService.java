package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Clinic;
import com.management.galle_hospital.Model.Doctor;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Payload.ClinicRequest;
import com.management.galle_hospital.Repository.ClinicRepository;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClinicService {
    private final ClinicRepository clinicRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public List<Clinic> getAllClinics() {
        return clinicRepository.findAll();
    }

    public ResponseEntity<?> getClinicById(Long id) {
        return clinicRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Clinic not found"));
    }

    public ResponseEntity<?> createClinic(ClinicRequest request) {
        if (isBlank(request.getClinicName())) {
            return error("clinicName is required", HttpStatus.BAD_REQUEST);
        }
        if (request.getNurseId() == null) {
            return error("nurseId is required", HttpStatus.BAD_REQUEST);
        }

        Clinic clinic = new Clinic();
        clinic.setClinicName(request.getClinicName());
        clinic.setDescription(request.getDescription());

        ResponseEntity<?> nurseError = applyNurse(clinic, request.getNurseId());
        if (nurseError != null) {
            return nurseError;
        }

        ResponseEntity<?> doctorsError = applyDoctors(clinic, request.getDoctorIds());
        if (doctorsError != null) {
            return doctorsError;
        }

        Clinic saved = clinicRepository.save(clinic);
        notifyNewlyAssignedDoctors(saved, Set.of());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    public ResponseEntity<?> updateClinic(Long id, ClinicRequest request) {
        return clinicRepository.findById(id)
                .<ResponseEntity<?>>map(clinic -> {
                    Set<Long> previousDoctorIds = currentDoctorIds(clinic);

                    if (request.getClinicName() != null) clinic.setClinicName(request.getClinicName());
                    if (request.getDescription() != null) clinic.setDescription(request.getDescription());

                    if (request.getNurseId() != null) {
                        ResponseEntity<?> nurseError = applyNurse(clinic, request.getNurseId());
                        if (nurseError != null) {
                            return nurseError;
                        }
                    }

                    ResponseEntity<?> doctorsError = applyDoctors(clinic, request.getDoctorIds());
                    if (doctorsError != null) {
                        return doctorsError;
                    }

                    Clinic saved = clinicRepository.save(clinic);
                    notifyNewlyAssignedDoctors(saved, previousDoctorIds);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> notFound("Clinic not found"));
    }

    public ResponseEntity<Map<String, String>> deleteClinic(Long id) {
        if (!clinicRepository.existsById(id)) {
            return notFound("Clinic not found");
        }
        clinicRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Clinic deleted successfully"));
    }

    private ResponseEntity<?> applyDoctors(Clinic clinic, List<Long> doctorIds) {
        if (doctorIds == null) {
            return null;
        }

        List<Doctor> doctors = doctorRepository.findAllById(doctorIds);
        if (doctors.size() != doctorIds.size()) {
            return error("One or more doctorIds are invalid", HttpStatus.BAD_REQUEST);
        }

        clinic.setDoctors(doctors);
        return null;
    }

    private ResponseEntity<?> applyNurse(Clinic clinic, Long nurseId) {
        var nurse = userRepository.findById(nurseId);
        if (nurse.isEmpty()) {
            return error("Nurse not found", HttpStatus.BAD_REQUEST);
        }
        if (nurse.get().getRole() != Role.NURSE) {
            return error("nurseId must belong to a NURSE user", HttpStatus.BAD_REQUEST);
        }
        clinic.setNurse(nurse.get());
        return null;
    }

    private Set<Long> currentDoctorIds(Clinic clinic) {
        if (clinic.getDoctors() == null) {
            return Set.of();
        }
        return clinic.getDoctors().stream().map(Doctor::getId).collect(Collectors.toSet());
    }

    private void notifyNewlyAssignedDoctors(Clinic clinic, Set<Long> previousDoctorIds) {
        if (clinic.getDoctors() == null) {
            return;
        }
        String nurseName = clinic.getNurse() == null
                ? "-"
                : fullName(clinic.getNurse().getFirstName(), clinic.getNurse().getLastName());
        for (Doctor doctor : clinic.getDoctors()) {
            if (previousDoctorIds.contains(doctor.getId())) {
                continue;
            }
            emailService.sendClinicAssignmentEmail(
                    doctor.getEmail(),
                    fullName(doctor.getFirstName(), doctor.getLastName()),
                    clinic.getClinicName(),
                    clinic.getDescription(),
                    nurseName,
                    clinic.getId()
            );
        }
    }

    private String fullName(String firstName, String lastName) {
        String first = firstName == null ? "" : firstName.trim();
        String last = lastName == null ? "" : lastName.trim();
        return (first + " " + last).trim();
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<Map<String, String>> notFound(String message) {
        return error(message, HttpStatus.NOT_FOUND);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
