package icpmapp.dto.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private Integer id;
    private String title;
    private String message;
    private String author;
    private Integer authorId;
    private Integer avatar;
    private LocalDateTime date;
    private Boolean read;
}
