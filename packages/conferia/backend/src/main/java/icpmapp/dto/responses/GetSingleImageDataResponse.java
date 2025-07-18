package icpmapp.dto.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetSingleImageDataResponse {
    private Boolean hasLiked;
    private String imageAuthor;
    private int imageLikes;
    private int authorId;
    private LocalDateTime uploadTime;
}
