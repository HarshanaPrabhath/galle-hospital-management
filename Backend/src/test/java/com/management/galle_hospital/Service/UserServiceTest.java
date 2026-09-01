package com.management.galle_hospital.Service;

import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.PasswordResetTokenRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Unit test for {@link UserService}.
 *
 * "Unit" test = we test ONE class in isolation. The database, email server, etc.
 * are replaced by Mockito fakes ("mocks"), so this test runs in milliseconds and
 * needs no MySQL/H2 running.
 *
 * {@code @ExtendWith(MockitoExtension.class)} tells JUnit 5 to let Mockito process
 * the {@code @Mock} annotations before each test method.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    // Each @Mock is a stand-in object. By default every method on it returns a
    // "empty" value (null, empty Optional, empty list, 0, false) until we say otherwise.
    // UserService's constructor needs all five of these, so we declare all five.
    @Mock private UserRepository userRepository;
    @Mock private PatientRepository patientRepository;
    @Mock private DoctorRepository doctorRepository;
    @Mock private PasswordResetTokenRepository passwordResetTokenRepository;
    @Mock private EmailService emailService;

    @Test
    void login_returns401_whenEmailIsNotRegistered() {
        // ---------- Arrange: set up the scenario ----------

        // Build the real object under test, handing it the mocks instead of real
        // repositories. (passwordEncoder / secureRandom are created inside UserService
        // itself, so they are not constructor arguments.)
        UserService userService = new UserService(
                userRepository, patientRepository, doctorRepository,
                passwordResetTokenRepository, emailService);

        // Teach the mock how to behave for THIS test:
        // "when someone asks the repository for this email, say there is no such user."
        when(userRepository.findByEmail("ghost@example.com"))
                .thenReturn(Optional.empty());

        // The input the caller would send.
        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("ghost@example.com");
        request.setPassword("whatever123");

        // ---------- Act: call the method we are testing ----------
        ResponseEntity<Map<String, String>> response = userService.login(request);

        // ---------- Assert: verify the outcome ----------
        // An unknown email must be rejected with HTTP 401 and a generic message
        // (generic on purpose: we must not reveal whether the email exists).
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(response.getBody()).containsEntry("message", "Invalid email or password");
    }
}
