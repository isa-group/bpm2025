package icpmapp.dto.requests;

import lombok.Data;

@Data
public class ChangeLikeStatusGalleryImageRequest {
    private Boolean likes;
    private String path;
}
