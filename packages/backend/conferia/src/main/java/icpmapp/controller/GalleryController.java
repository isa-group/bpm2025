package icpmapp.controller;

import icpmapp.entities.User;
import icpmapp.repository.UserRepository;
import icpmapp.services.UserService;
import lombok.RequiredArgsConstructor;
import icpmapp.dto.requests.ChangeLikeStatusGalleryImageRequest;
import icpmapp.dto.requests.DeleteGalleryRequest;
import icpmapp.dto.responses.GetGalleryResponse;
import icpmapp.dto.responses.GetSingleImageDataResponse;
import icpmapp.dto.responses.PostGalleryResponse;
import icpmapp.services.JWTService;
import icpmapp.services.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final JWTService jwtService;

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/images")
    public ResponseEntity<GetGalleryResponse> getImagesMetaData(@RequestHeader(value = "Authorization", required = false) String authorizationHeader,
                                                                @RequestParam(required = false, defaultValue = "0") int pageNr,
                                                                @RequestParam(required = false, defaultValue = "100") int pageSize,
                                                                @RequestParam(required = false, defaultValue = "") String search,
                                                                @RequestParam(required = false, defaultValue = "uploadTime") String filterChoice,
                                                                @RequestParam(required = false, defaultValue = "true") boolean orderValue) {
        String token = authorizationHeader.substring(7);
        User currentUser = userService.getUser(jwtService.extractUserName(token));
        currentUser.setLastDownloadPictures(LocalDateTime.now());
        userRepository.save(currentUser);

        return ResponseEntity.ok(storageService.getGalleryImagesMetadata(pageNr, pageSize, search, filterChoice, orderValue));
    }


    @GetMapping("/images/{filepath}")
    public ResponseEntity<Resource> getImage(@PathVariable String filepath, @RequestParam(name = "format") String format) {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(storageService.getGalleryImage(filepath,format));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/image/{filepath}")
    public ResponseEntity<GetSingleImageDataResponse> getSingleImageData(@PathVariable String filepath, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(storageService.getGalleryImageSingleData(filepath, username));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PostMapping("/images")
    public ResponseEntity<PostGalleryResponse> uploadImages(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, MultipartFile file) throws IOException {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(storageService.uploadGalleryImages(file,username));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/myImages")
    public ResponseEntity<GetGalleryResponse> getMyGalleryImages(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(storageService.getMyGalleryImagesMetadata(username));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @DeleteMapping("/images")
    public ResponseEntity<String> deleteImage(@RequestHeader(value = "Authorization", required = false) String authorizationHeader,@RequestBody DeleteGalleryRequest deleteGalleryRequest) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        storageService.deleteGalleryImage(username, deleteGalleryRequest);
        return ResponseEntity.ok("The image/images was deleted successfully");
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PutMapping("/changeLikeStatusGalleyImage")
    public ResponseEntity<String> changeLikeStatusForGalleryImage(@RequestHeader(value = "Authorization", required = false) String authorizationHeader,@RequestBody ChangeLikeStatusGalleryImageRequest changeLikeStatusGalleryImageRequest) {
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        storageService.changeLikeStatusForGalleryImage(changeLikeStatusGalleryImageRequest.getLikes(), username, changeLikeStatusGalleryImageRequest.getPath());
        return ResponseEntity.ok("Like status changed");
    }
}
