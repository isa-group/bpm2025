package icpmapp.controller;

import icpmapp.dto.requests.*;
import lombok.RequiredArgsConstructor;
import icpmapp.dto.responses.GetUserResponse;
import icpmapp.dto.responses.UserIdResponse;
import icpmapp.dto.responses.UsernameResponse;
import icpmapp.entities.User;
import icpmapp.services.AuthenticationService;
import icpmapp.services.StorageService;
import icpmapp.services.JWTService;
import icpmapp.services.UserService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final JWTService jwtService;
    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final StorageService storageService;


    //Basic user interaction and fetching user details:
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi User");
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/id")
    public ResponseEntity<UserIdResponse> getId(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(userService.getId(username));
    }

    @PreAuthorize("hasAnyAuthority('INACTIVE', 'USER', 'ADMIN')")
    @GetMapping("/userDetails")
    public ResponseEntity<GetUserResponse> getUserDetails(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(username);
        return ResponseEntity.ok(userService.getModifiedUserDetails(userDetails));
    }

    //Register new users
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/register")
    public ResponseEntity<String> deleteAccount(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authenticationService.deleteAccount(registerRequest));
    }

    //Updating credentials:
    @PreAuthorize("hasAnyAuthority('INACTIVE', 'USER', 'ADMIN')")
    @PostMapping("/update")
    public ResponseEntity<JwtAuthenticationResponse> updateUser(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody UserRequest updateRequest) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(authenticationService.updateCredentials(username, updateRequest));
    }

    //Change password
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody ChangePasswordRequest changePasswordRequest) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        authenticationService.changePasswordForUser(changePasswordRequest, username);
        return ResponseEntity.ok("Password has been changed successfully");
    }

    //Change password
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PostMapping("/resetPassword")
    public ResponseEntity<String> changePassword(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody ResetPasswordRequest resetPasswordRequest) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        authenticationService.resetPasswordForUser(resetPasswordRequest, username);
        return ResponseEntity.ok("Password has been reset successfully");
    }

    // Change profile picture
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PostMapping("/uploadProfilePicture")
    public ResponseEntity<String> storeFile(@RequestParam("file") MultipartFile file, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws IOException {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        storageService.storeProfileImage(file, username);
        return ResponseEntity.ok("File was uploaded successfully");
    }

    // Change profile picture
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/getProfilePicture/{id}")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable Integer id, @RequestParam(name = "format") String format) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // or the appropriate content type
                .body(storageService.getProfileImage(id, format));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/getName/{id}")
    public ResponseEntity<UsernameResponse> getName(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getName(id));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/getName")
    public ResponseEntity<UsernameResponse> getMyName(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(userService.getName(username));
    }



}
