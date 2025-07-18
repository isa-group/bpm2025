package icpmapp.services.impl;

import icpmapp.dto.requests.EmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import icpmapp.services.EmailService;
import icpmapp.services.JWTService;
import icpmapp.services.UserService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender mailSender;
    private final JWTService jwtService;
    private final UserService userService;

    public void sendSignup(EmailRequest emailRequest) throws AccessDeniedException, MessagingException {
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(emailRequest.getReceiver());
        boolean hasRequiredRole = userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority ->
                        grantedAuthority.getAuthority().equals("INACTIVE"));


        if (!hasRequiredRole) {
            throw new AccessDeniedException("User already activated.");
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setFrom("noreply@compute.dtu.dk");
        helper.setTo(emailRequest.getReceiver());
        helper.setSubject("ICPM app account activation");
        String token =  jwtService.generateToken(userDetails);
        helper.setText("<html><body><img src=\"https://icpmconference.org/2024/wp-content/uploads/sites/9/2023/08/cropped-icpm-logo-1.png\" height='50' /><p>Hi!</p><p>To activate your account for the ICPM app, click on the following link: https://icpm.compute.dtu.dk/#/auth/register/" + token + ".</p></body></html>", true);
        mailSender.send(mimeMessage);
    }

    public void sendResetPassword(EmailRequest emailRequest) throws AccessDeniedException, MessagingException {
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(emailRequest.getReceiver());
        boolean hasWrongRole = userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority ->
                        grantedAuthority.getAuthority().equals("INACTIVE"));


        if (hasWrongRole) {
            throw new AccessDeniedException("User needs to be activated");
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setFrom("noreply@compute.dtu.dk");
        helper.setTo(emailRequest.getReceiver());
        helper.setSubject("Reset password");
        String token =  jwtService.generateToken(userDetails);
        helper.setText("<html><body><img src=\"https://icpmconference.org/2024/wp-content/uploads/sites/9/2023/08/cropped-icpm-logo-1.png\" height='50' /><p>Hi!</p><p>To reset your ICPM app account password, click on the following link: https://icpm.compute.dtu.dk/#/auth/login/resetpassword/" + token + ".</p></body></html>", true);
        mailSender.send(mimeMessage);
    }
}
