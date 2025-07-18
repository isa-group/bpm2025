package icpmapp.dto.requests;

import lombok.Data;

@Data
public class UserRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String country;
    private String company;
    private boolean sharingChoice;
}
