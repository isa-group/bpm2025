package icpmapp.dto.responses;

import lombok.Data;

@Data
public class AttendeeResponse {
    private String firstname;
    private String lastname;
    private String email;
    private String avatar_path;
    private String company;
    private String country;
    private Integer Id;

}
