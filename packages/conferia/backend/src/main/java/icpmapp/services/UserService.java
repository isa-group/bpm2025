package icpmapp.services;


import icpmapp.dto.responses.GetUserResponse;
import icpmapp.dto.responses.UserIdResponse;
import icpmapp.dto.responses.UsernameResponse;
import icpmapp.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();

    GetUserResponse getModifiedUserDetails(UserDetails userDetails);

    UserIdResponse getId(String userName);

    UsernameResponse getName(int id);

    UsernameResponse getName(String username);

    User getUser(String username);
}
