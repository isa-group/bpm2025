package icpmapp.services;

import icpmapp.dto.responses.AttendeeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AttendeeService {
    Page<AttendeeResponse> getAttendees(Pageable pageable, String search);

    AttendeeResponse getAttendee(Integer id);
}
