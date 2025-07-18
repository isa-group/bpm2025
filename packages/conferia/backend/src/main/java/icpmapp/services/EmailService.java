package icpmapp.services;

import icpmapp.dto.requests.EmailRequest;
import jakarta.mail.MessagingException;

import java.nio.file.AccessDeniedException;

public interface EmailService {
    void sendSignup(EmailRequest emailRequest) throws AccessDeniedException, MessagingException;

   void sendResetPassword(EmailRequest emailRequest) throws AccessDeniedException, MessagingException;
}
