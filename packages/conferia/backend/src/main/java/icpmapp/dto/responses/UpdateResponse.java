package icpmapp.dto.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateResponse {

    private int numberOfMessages;
    private int numberOfPictures;

    private LocalDateTime lastDownloadMessages;
    private LocalDateTime lastDownloadPictures;
}
