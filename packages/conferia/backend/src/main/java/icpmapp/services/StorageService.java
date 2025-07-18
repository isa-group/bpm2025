package icpmapp.services;

import icpmapp.dto.requests.DeleteGalleryRequest;
import icpmapp.dto.responses.GetGalleryResponse;
import icpmapp.dto.responses.GetSingleImageDataResponse;
import icpmapp.dto.responses.PostGalleryResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    void storeProfileImage(MultipartFile file, String username) throws IOException;

    Resource getProfileImage(Integer id, String format) throws IOException;

    GetGalleryResponse getGalleryImagesMetadata(int pageNr, int pageSize, String search, String filterChoice, boolean orderValue);

    GetSingleImageDataResponse getGalleryImageSingleData (String filepath, String username);

    GetGalleryResponse getMyGalleryImagesMetadata(String username);
    Resource getGalleryImage(String filepath, String format);

    PostGalleryResponse uploadGalleryImages(MultipartFile file, String username) throws IOException;

    void deleteGalleryImage(String username, DeleteGalleryRequest deleteGalleryRequest);

    void changeLikeStatusForGalleryImage(Boolean likes, String username, String filePath);
}
