package icpmapp.controller;

import icpmapp.services.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import icpmapp.dto.responses.AttendeeResponse;
import icpmapp.services.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/v1/attendees")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;
    private StorageService storageService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<Page<AttendeeResponse>> getAttendees(@RequestParam(required = false, defaultValue = "0") int page,
                                                               @RequestParam(required = false, defaultValue = "50") int size,
                                                               @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("lastname"));
        return ResponseEntity.ok(attendeeService.getAttendees(pageable, search));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<AttendeeResponse> getAttendee (@PathVariable Integer id) {
        return ResponseEntity.ok(attendeeService.getAttendee(id));
    }

}
