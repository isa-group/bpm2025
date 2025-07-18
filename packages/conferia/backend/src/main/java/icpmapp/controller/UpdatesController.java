package icpmapp.controller;

import com.mysql.cj.result.LocalDateTimeValueFactory;
import icpmapp.dto.SessionHeaderDTO;
import icpmapp.dto.responses.UpdateResponse;
import icpmapp.entities.User;
import icpmapp.repository.GalleryStorageRepository;
import icpmapp.repository.MessageRepository;
import icpmapp.services.JWTService;
import icpmapp.services.MessageService;
import icpmapp.services.StorageService;
import icpmapp.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/updates")
@RequiredArgsConstructor
public class UpdatesController {

    private final JWTService jwtService;
    private final UserService userService;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private GalleryStorageRepository galleryStorageRepository;

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<UpdateResponse> getUpdates(@RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        User currentUser = userService.getUser(jwtService.extractUserName(token));

        int messages = messageRepository.getMessagesNotReadByUser(currentUser.getId());

        int pictures = galleryStorageRepository.getPicturesAfterDate(
                currentUser.getLastDownloadPictures() == null?
                        LocalDateTime.of(1970, 1, 1, 0, 0) :
                        currentUser.getLastDownloadPictures());

        UpdateResponse response = new UpdateResponse();
        response.setNumberOfMessages(messages);
        response.setNumberOfPictures(pictures);
        response.setLastDownloadMessages(currentUser.getLastDownloadMessages());
        response.setLastDownloadPictures(currentUser.getLastDownloadPictures());
        return ResponseEntity.ok(response);
    }
}
