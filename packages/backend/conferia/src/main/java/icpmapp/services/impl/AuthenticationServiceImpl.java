package icpmapp.services.impl;

import icpmapp.dto.requests.*;
import icpmapp.entities.User;
import icpmapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import icpmapp.dto.requests.*;
import icpmapp.entities.Role;
import icpmapp.services.AuthenticationService;
import icpmapp.services.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest registerRequest){
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setFirstname(registerRequest.getFirstname());
        user.setLastname(registerRequest.getLastname());
        user.setRole(Role.INACTIVE);

        return userRepository.save(user);
    }

    public String deleteAccount(RegisterRequest registerRequest){
        User user = userRepository.findByEmail(registerRequest.getEmail()).orElseThrow(() ->
                new IllegalArgumentException("invalid email."));
        userRepository.delete(user);

        return "Account deleted.";
    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                    signinRequest.getPassword()));

            var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(() ->
                    new IllegalArgumentException("invalid email or password."));
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setAccessToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);
            jwtAuthenticationResponse.setUserId(user.getId());
            return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setAccessToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }

    public JwtAuthenticationResponse updateCredentials(String username, UserRequest updateRequest){
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));


        user.setLastname(updateRequest.getLastname());
        user.setFirstname(updateRequest.getFirstname());
        user.setCountry(updateRequest.getCountry());
        user.setCompany(updateRequest.getCompany());
        user.setSharingchoice(updateRequest.isSharingChoice());

        if (user.getRole() == Role.INACTIVE) {
            user.setPassword(passwordEncoder.encode(updateRequest.getPassword())); //passwordEncoder.encode()
            user.setRole(Role.USER);
        }

        if (!Objects.equals(username, updateRequest.getEmail())) {
            user.setEmail(updateRequest.getEmail());
            userRepository.save(user);
            userRepository.flush();

            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setAccessToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);
            return jwtAuthenticationResponse;

        } else {
            userRepository.save(user);
            return null;
        }
    }

    public User changePasswordForUser(ChangePasswordRequest changePasswordRequest, String username) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,
                changePasswordRequest.getOldPassword()));
        var user = userRepository.findByEmail(username).orElseThrow(() ->
                new IllegalArgumentException("invalid password."));
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));

        return userRepository.save(user);
    }

    public User resetPasswordForUser(ResetPasswordRequest resetPasswordRequest, String username) {
        var user = userRepository.findByEmail(username).orElseThrow(() ->
                new IllegalArgumentException("invalid email."));
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));

        return userRepository.save(user);
    }

}
