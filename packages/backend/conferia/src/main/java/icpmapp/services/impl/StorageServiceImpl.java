package icpmapp.services.impl;



import icpmapp.dto.requests.DeleteGalleryRequest;
import icpmapp.dto.responses.GetGalleryResponse;
import icpmapp.dto.responses.GetSingleImageDataResponse;
import icpmapp.dto.responses.PostGalleryResponse;
import icpmapp.entities.GalleryImage;
import icpmapp.entities.User;
import icpmapp.repository.GalleryStorageRepository;
import icpmapp.repository.UserRepository;
import icpmapp.services.StorageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final UserRepository userRepository;
    private final GalleryStorageRepository galleryStorageRepository;
    @Value("${file.upload-dir}")
    private String storageDir;

    public void storeProfileImage(MultipartFile file, String username) throws IOException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));
        String objectName = "profilePicture/" + user.getId();

        user.setAvatar_path(objectName);
        userRepository.save(user);

        Path storageDirectory = Paths.get(storageDir + "/profilePictures");

        // Ensure the storage directory exists
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        Path destinationFilePath = storageDirectory.resolve(user.getId() + ".jpg");
        Path destinationFilePathWebP = storageDirectory.resolve(user.getId() + ".webp");



        // Copy the file to the destination, replacing it if it already exists
        try {
            file.transferTo(destinationFilePath);
            byte[] webPImageData = convertToWebP(destinationFilePath.toFile());
            File webPFile = destinationFilePathWebP.toFile();
            try (FileOutputStream fos = new FileOutputStream(webPFile)) {
                fos.write(webPImageData);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Resource getProfileImage(Integer id, String format) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Path path = Paths.get(storageDir + "/profilePictures", id + "." + format);
        Resource resource = new UrlResource(path.toUri());
        if (!resource.exists()) {
            return null;
        }
        return resource;
    }

    public GetGalleryResponse getGalleryImagesMetadata(int pageNr, int pageSize, String search, String filterChoice, boolean orderValue) {
        try{
            Sort sort = Sort.unsorted();
            if (filterChoice != null && filterChoice.equals("likes")) {
                sort = Sort.by(Sort.Order.by("likeCount").with(orderValue ? Sort.Direction.ASC : Sort.Direction.DESC));
            } else if (filterChoice != null && filterChoice.equals("uploadTime")) {
                sort = Sort.by(Sort.Order.by("uploadTime").with(orderValue ? Sort.Direction.ASC : Sort.Direction.DESC));
            }
            Pageable pageable = PageRequest.of(pageNr, pageSize, sort);

            Page<GalleryImage> page = galleryStorageRepository.searchGalleryImages(search, pageable);

            List<String> imgPaths = page.getContent().stream().map(GalleryImage::getPath).toList();

            GetGalleryResponse getGalleryResponse = new GetGalleryResponse();
            getGalleryResponse.setImagePaths(imgPaths);

            return getGalleryResponse;
        } catch (Exception e) {
            System.out.println("Failed to fetch images metadata" + e.getMessage());
            return null;
        }
    }

    public GetSingleImageDataResponse getGalleryImageSingleData(String filepath, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));
        GetSingleImageDataResponse getSingleImageDataResponse = new GetSingleImageDataResponse();
        Optional<GalleryImage> galleryImage = galleryStorageRepository.findByPath(filepath);
        if (galleryImage.isPresent()) {
            GalleryImage image = galleryImage.get();
            getSingleImageDataResponse.setImageAuthor(image.getOwner().getFirstname() + " " + image.getOwner().getLastname());
            getSingleImageDataResponse.setImageLikes(image.getLikedBy().size());
            getSingleImageDataResponse.setHasLiked(image.getLikedBy().contains(user));
            getSingleImageDataResponse.setAuthorId(image.getOwner().getId());
            getSingleImageDataResponse.setUploadTime(image.getUploadTime());
        }
        return getSingleImageDataResponse;

    }

    public GetGalleryResponse getMyGalleryImagesMetadata(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        List<String> imagePaths = user.getGalleryImages().stream()
                .map(GalleryImage::getPath)
                .collect(Collectors.toList());

        GetGalleryResponse getGalleryResponse = new GetGalleryResponse();
        getGalleryResponse.setImagePaths(imagePaths);
        return getGalleryResponse;
    }


    public Resource getGalleryImage(String filepath, String format) {
        try {
            Path basePath = Paths.get(storageDir, "Gallery");
            Path fileWebP = basePath.resolve(filepath + "." + format).normalize();
            Resource resourceWebP = new UrlResource(fileWebP.toUri());
            if (resourceWebP.exists() && resourceWebP.isReadable()) {
                return resourceWebP;
            } else {
                Path fileJpg = basePath.resolve(filepath + ".jpg").normalize();
                Resource resourceJpg = new UrlResource(fileJpg.toUri());
                if (resourceJpg.exists() && resourceJpg.isReadable()) {
                    return resourceJpg;
                } else {
                    return null;
                }
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
        public PostGalleryResponse uploadGalleryImages(MultipartFile file, String username) throws IOException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));

        Path storageDirectory = Paths.get(storageDir,"Gallery");

        Files.createDirectories(storageDirectory);

        LocalDateTime localDateTime = LocalDateTime.now();
        String time = localDateTime.toString().replace(":", "").replace(".","");

        GalleryImage galleryImage = new GalleryImage();
        galleryImage.setOwner(user);
        galleryImage.setUploadTime(localDateTime);
        galleryImage.setPath(user.getId() + "-" + time);
        galleryStorageRepository.save(galleryImage);


        Path destinationPathJPG = storageDirectory.resolve( user.getId() + "-" + time + ".jpg");
        Path destinationPathWebP = storageDirectory.resolve(user.getId() + "-" + time + ".webp");

        try {
//            file.transferTo(destinationPathJPG.toFile());
            Files.copy(file.getInputStream(), destinationPathJPG);
            byte[] webPImageData = convertToWebP(destinationPathJPG.toFile());
            File webPFile = destinationPathWebP.toFile();
            try (FileOutputStream fos = new FileOutputStream(webPFile)) {
                fos.write(webPImageData);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new PostGalleryResponse(user.getId() + "-" + time);

    }
    @Transactional
    public void deleteGalleryImage(String username, DeleteGalleryRequest deleteGalleryRequest) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));

        List<GalleryImage> imagesToDelete = new ArrayList<>();
        for (String path : deleteGalleryRequest.getImagePaths()) {
            Optional<GalleryImage> imageOpt = galleryStorageRepository.findByPath(path);
            if (imageOpt.isEmpty()) {
                throw new RuntimeException("Image not found at path: " + path);
            }
            GalleryImage image = imageOpt.get();
            if (!image.getOwner().equals(user)) {
                throw new RuntimeException("Image at path " + path + " was not uploaded by the user: " + username);
            }
            // Remove the image from all users' likes
            image.getLikedBy().forEach(u -> u.getLikes().remove(image));
            image.getLikedBy().clear();

            imagesToDelete.add(image);
        }

        // Save changes to detach the images from all related entities
        galleryStorageRepository.saveAll(imagesToDelete);

        // Delete images from the repository
        galleryStorageRepository.deleteAll(imagesToDelete);

        for (GalleryImage image : imagesToDelete) {
            Path imagePath = Paths.get(storageDir, "Gallery", image.getPath() + ".jpg");
            Path imageWebPPath = Paths.get(storageDir, "Gallery", image.getPath() + ".webp");
            try {
                Files.deleteIfExists(imagePath);
                Files.deleteIfExists(imageWebPPath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image from local storage", e);
            }
        }

    }

    public byte[] convertToWebP(File inputImage) throws IOException {
        // Read the input image
        BufferedImage originalImage = ImageIO.read(inputImage);

        // Calculate the new height to maintain the aspect ratio
        int targetWidth = 400;
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();
        int targetHeight = (targetWidth * originalHeight) / originalWidth;

        // Resize the image
        Image resultingImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_SMOOTH);
        BufferedImage outputImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = outputImage.createGraphics();
        g2d.drawImage(resultingImage, 0, 0, null);
        g2d.dispose();

        // Create a byte array output stream to capture the WebP output
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            ImageIO.write(outputImage, "webp", baos);
            // Return the byte array
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert image to WebP", e);
        }
    }

    @Transactional
    public void changeLikeStatusForGalleryImage(Boolean likes, String username, String filePath) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));

        Optional<GalleryImage> galleryImage = galleryStorageRepository.findByPath(filePath);
        if (galleryImage.isEmpty()) {
            throw new EntityNotFoundException("Gallery image not found with path: " + filePath);
        }

        GalleryImage image = galleryImage.get();
        boolean isUserAlreadyLikes = image.getLikedBy().contains(user);

        if (likes && !isUserAlreadyLikes) {
            image.addLike(user);
        } else if (!likes && isUserAlreadyLikes) {
            image.removeLike(user);
        }

        galleryStorageRepository.save(image); // Saving image should suffice due to cascading and inverse relationship
    }
}
