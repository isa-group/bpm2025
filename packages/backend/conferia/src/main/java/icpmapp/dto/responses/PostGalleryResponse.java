package icpmapp.dto.responses;

import lombok.Data;

@Data
public class PostGalleryResponse {
    private String pathName;

    public PostGalleryResponse(String pathName) {
        this.pathName = pathName;
    }
}
