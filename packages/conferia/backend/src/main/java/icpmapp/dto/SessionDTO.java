package icpmapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import icpmapp.entities.SessionType;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
public class SessionDTO {
    private String name;
    private String host;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private SessionType type;
    private String content;

}
