package icpmapp.services.impl;

import icpmapp.dto.responses.AttendeeResponse;
import icpmapp.entities.User;
import icpmapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import icpmapp.services.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttendeeServiceImpl implements AttendeeService {

    @Autowired
    private UserRepository userRepository;

    public Page<AttendeeResponse> getAttendees(Pageable pageable, String search) {
        Page<User> page;
        if (search != null && !search.trim().isEmpty()) {
            page = userRepository.searchWithConditionalPrivacy(search.toLowerCase(), pageable);
        } else {
            page = userRepository.findAll(pageable);
        }
        return page.map(this::convertToDto);
    }

    public AttendeeResponse getAttendee(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return convertToDto(user);
    }

    private AttendeeResponse convertToDto(User user) {
        AttendeeResponse dto = new AttendeeResponse();
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setId(user.getId());
        dto.setAvatar_path(user.getAvatar_path());
        if (Boolean.TRUE.equals(user.getSharingchoice())){
            dto.setAvatar_path(user.getAvatar_path());
            dto.setCompany(user.getCompany());
            dto.setCountry(user.getCountry());
            dto.setEmail(user.getEmail());
        }
        return dto;
    }
}
