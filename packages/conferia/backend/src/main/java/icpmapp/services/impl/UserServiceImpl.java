package icpmapp.services.impl;

import icpmapp.dto.responses.GetUserResponse;
import icpmapp.dto.responses.UserIdResponse;
import icpmapp.dto.responses.UsernameResponse;
import icpmapp.entities.User;
import icpmapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import icpmapp.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with email " + username));
            }
        };
    }

    public GetUserResponse getModifiedUserDetails(UserDetails userDetails) {
        if (userDetails instanceof User user) {
            GetUserResponse getUserResponse = new GetUserResponse();
            getUserResponse.setEmail(user.getEmail());
            getUserResponse.setFirstname(user.getFirstname());
            getUserResponse.setLastname(user.getLastname());
            getUserResponse.setCompany(user.getCompany());
            getUserResponse.setCountry(user.getCountry());
            getUserResponse.setSharingChoice(user.getSharingchoice() == null? true : user.getSharingchoice());
            getUserResponse.setProfilePicture(user.getAvatar_path());
            getUserResponse.setId(user.getId());
            return getUserResponse;
        }
        throw new IllegalArgumentException("The provided userDetails cannot be cast to User");
    }

    public User getUser(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

    public UserIdResponse getId(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userName));
        UserIdResponse userIdResponse = new UserIdResponse();
        userIdResponse.setId(user.getId());

        return userIdResponse;
    }

    public UsernameResponse getName(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        UsernameResponse getNameResponse = new UsernameResponse();
        getNameResponse.setFirstname(user.getFirstname());
        getNameResponse.setLastname(user.getLastname());
        return getNameResponse;
    }

    public UsernameResponse getName(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + username));
        UsernameResponse getNameResponse = new UsernameResponse();
        getNameResponse.setFirstname(user.getFirstname());
        getNameResponse.setLastname(user.getLastname());
        return getNameResponse;
    }
}
