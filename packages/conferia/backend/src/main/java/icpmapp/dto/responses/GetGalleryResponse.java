package icpmapp.dto.responses;

import lombok.Data;

import java.util.List;

@Data
public class GetGalleryResponse {
    private List<String> imagePaths;
}
