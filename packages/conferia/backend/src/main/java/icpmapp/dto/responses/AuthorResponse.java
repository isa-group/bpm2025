package icpmapp.dto.responses;

import lombok.Data;

@Data
public class AuthorResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String affiliation;
    private String orcid;
    private Integer userId;
}
