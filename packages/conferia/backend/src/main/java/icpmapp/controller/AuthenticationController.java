package icpmapp.controller;

import icpmapp.dto.requests.*;
import icpmapp.entities.User;
import icpmapp.repository.UserRepository;
import icpmapp.services.JWTService;
import icpmapp.services.UserService;
import lombok.RequiredArgsConstructor;
import icpmapp.services.AuthenticationService;
import icpmapp.services.EmailService;

import java.nio.file.AccessDeniedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final UserService userService;
    private final JWTService jwtService;

    //User sign-in, and JWT token management.
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest){
        return ResponseEntity.ok(authenticationService.signin(signinRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    //Email Operations
    @PostMapping("/signup")
    public ResponseEntity<?> sendSignup(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendSignup(emailRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendResetPassword(emailRequest);
            return ResponseEntity.ok().body("Reset email sent successfully.");
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send reset email.");
        }
    }
}
