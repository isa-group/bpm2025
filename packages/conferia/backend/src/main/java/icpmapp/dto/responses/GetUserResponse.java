package icpmapp.dto.responses;

import lombok.Data;

@Data
public class GetUserResponse {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String country;
    private String company;
    private String profilePicture;
    private boolean sharingChoice;
    private Integer id;
}
