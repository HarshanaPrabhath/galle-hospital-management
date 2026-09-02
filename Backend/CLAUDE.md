# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Spring Boot 4.0.6 (Java 17) backend REST API for the Galle Hospital Management System. Maven project, MySQL in dev, H2 in tests. No frontend code lives here — CORS is configured for a Vite dev server at `http://localhost:5173`.

## Common commands

Run from the `Backend` directory (this is the Maven project root — `pom.xml` is here).

```
./mvnw spring-boot:run          # run the app (port 5000)
./mvnw test                     # run all tests (uses the "test" profile / H2, see below)
./mvnw test -Dtest=ClassName    # run a single test class
./mvnw test -Dtest=ClassName#methodName   # run a single test method
./mvnw clean package            # build the jar (skips nothing by default; add -DskipTests to skip tests)
```

On Windows use `mvnw.cmd` instead of `./mvnw` if not running inside a POSIX shell.

Tests activate `@ActiveProfiles("test")`, which loads `src/test/resources/application-test.properties` (H2 in-memory, MySQL-compatible mode, schema auto-created via `create-drop`). No separate test database setup is needed.

## Configuration

`src/main/resources/application.properties` reads secrets/config from environment variables with defaults for local dev:
- `DB_USERNAME` / `DB_PASSWORD` — MySQL connection (defaults to `root` / a placeholder password). Expects a local MySQL at `localhost:3306`; the `gallehospital` schema is auto-created via `createDatabaseIfNotExist=true`.
- `OPENAI_API_KEY` / `OPENAI_MODEL` — used by `OpenAiChatService` for the `/api/chat` assistant endpoint. Chat calls fail with 500 if the key is unset.
- `MAIL_USERNAME` / `MAIL_PASSWORD` — Gmail SMTP creds for password-reset emails (`EmailService`).
- `spring.jpa.hibernate.ddl-auto=update` in dev — schema changes to `@Entity` classes apply automatically on startup against the real MySQL DB. Be mindful of this when changing entities: there are no Flyway/Liquibase migrations in this repo.

On startup, `GalleHospitalApplication` seeds a default admin user (`admin@example.com` / `admin123`) via a `CommandLineRunner` if one doesn't already exist.

## Architecture

Standard layered Spring MVC structure under `com.management.galle_hospital`:

- **Model** — JPA entities. `User` is the base entity (`@Inheritance(strategy = InheritanceType.JOINED)`), extended by `Admin`, `Doctor`, `Patient`, and used directly (not subclassed) for `Role.NURSE`/`Role.LAB` staff — those are plain `User` rows with `role` set, not their own subclass. `Role` is a single enum (`ADMIN`, `DOCTOR`, `PATIENT`, `NURSE`, `LAB`) shared across all user types — there's no separate authorities/permissions model.
- **Repository** — Spring Data JPA interfaces, one per aggregate root (no generic base repository).
- **Service** — business logic and validation live here, not in controllers. Services return `ResponseEntity<...>` directly (not just DTOs/domain objects) so controllers stay thin pass-throughs — see `UserService`, `DoctorService`, etc. Follow this pattern for new endpoints rather than pushing status-code/error decisions into controllers.
- **Controller** — thin, `@RequiredArgsConstructor`-injected, delegate straight to a service method per action.
- **Payload** — request/response DTOs, one class per request shape (e.g. `DoctorRegistrationRequest` vs `DoctorUpdateRequest` are distinct classes, not a shared partial-update DTO).
- **Config** — `CorsConfig` is currently the only config class.

### Authentication model

There is **no Spring Security filter chain** in this project (only `spring-security-crypto` is a dependency, used solely for `BCryptPasswordEncoder`). Auth is hand-rolled in `UserService`/`AuthenticationController`:
- `/api/auth/login` checks credentials and returns the user's `id` and `role` in the JSON body — there is no session/token/JWT issued. The frontend is expected to persist that response and pass identifying info itself.
- There is no request-level authorization/guard checking role on protected endpoints — endpoints are open unless a service method explicitly checks something. Keep this in mind before assuming an endpoint is role-protected; if you add sensitive endpoints, authorization needs to be added explicitly.
- Registration is split by role: `/api/auth/register` (generic, defaults to `PATIENT`), plus `/api/auth/{patient,doctor,lab,nurse}/register`, each validating and building the appropriate entity type via `UserService`. `Nurse`/`Lab` registrations build a plain `User` via `buildStaffUser` rather than a subclass.
- Password reset uses a `PasswordResetToken` entity with expiry (`app.password-reset.token-expiration-minutes`) and single-use enforcement (`usedAt`), emailed via `EmailService`.

### Error handling

`ApiExceptionHandler` (`@RestControllerAdvice`) centralizes translation of a small set of exceptions (`HttpMessageNotReadableException`, `DataIntegrityViolationException`, `ResponseStatusException`) into `{"message": "..."}` JSON bodies. Services throw `ResponseStatusException` for expected failure cases (see `OpenAiChatService`) or return an error `ResponseEntity` directly (see `UserService`'s `error(...)` helper) — both patterns coexist, follow whichever the surrounding service already uses.

### Validation

There's no Bean Validation (`jakarta.validation`) annotations in use — validation is manual, done in service methods via regex patterns and helper methods (see `UserService`'s `EMAIL_PATTERN`/`MOBILE_PATTERN`/`NIC_PATTERN` and `validateRegistration`/`validateCredentials`). Follow this manual-validation style for new fields rather than introducing `@Valid`/annotation-based validation, to stay consistent.
