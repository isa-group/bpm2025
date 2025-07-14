package icpmapp.dto.requests;

import lombok.Data;

import java.util.List;

@Data
public class DeleteGalleryRequest {
    private List<String> imagePaths;
}
