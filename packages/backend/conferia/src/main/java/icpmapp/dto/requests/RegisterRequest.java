package icpmapp.dto.requests;
import lombok.Data;

@Data
public class RegisterRequest {

    private String email;
    private String firstname;
    private String lastname;
}
