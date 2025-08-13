package icpmapp.dto.requests;

import lombok.Data;

@Data
public class AuthorRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String affiliation;
    private String orcid;
    private Integer userId; // optional link
}
