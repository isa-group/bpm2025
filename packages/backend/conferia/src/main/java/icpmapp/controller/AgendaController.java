package icpmapp.controller;

import lombok.RequiredArgsConstructor;
import icpmapp.dto.SessionDTO;
import icpmapp.dto.SessionHeaderDTO;
import icpmapp.dto.requests.SessionLikeRequest;
import icpmapp.entities.SessionHeader;
import icpmapp.repository.SessionHeaderRepository;
import icpmapp.services.AgendaService;
import icpmapp.services.JWTService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/agenda")
@RequiredArgsConstructor
public class AgendaController {
    private final SessionHeaderRepository sessionHeaderRepository;
    private final AgendaService agendaService;
    private final JWTService jwtService;

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/sessions")
    public ResponseEntity<List<SessionHeaderDTO>> getHeaders() {
        List<SessionHeaderDTO> headers = agendaService.fetchAll();
        return ResponseEntity.ok(headers);
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/session/{id}")
    public ResponseEntity<SessionDTO> getSessionById(@PathVariable Long id) {
        SessionDTO response = agendaService.findById(id);
        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/session/create")
    public ResponseEntity<SessionHeader> createPage (@RequestBody SessionDTO sessionDTO) {
        return ResponseEntity.ok(agendaService.create(sessionDTO));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/session/update/{id}")
    public ResponseEntity<SessionHeader> updatePage (@PathVariable Long id, @RequestBody SessionDTO sessionDTO) {
        return ResponseEntity.ok(agendaService.update(sessionDTO, id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping("/session/like")
    public ResponseEntity<String> likeSession(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody SessionLikeRequest sessionLikeRequest){
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        agendaService.changeLikeStatusForSession(sessionLikeRequest.getLikes(), username, sessionLikeRequest.getId());
        return ResponseEntity.ok("Like Status Changed");
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/session/likedlist/{id}")
    public ResponseEntity<List<SessionHeaderDTO>> findLikedSessionsByUser(@PathVariable("id") Integer userId){
        return ResponseEntity.ok(agendaService.findLikedSessionsByUser(userId));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/session/hearts")
    public ResponseEntity<List<Long>> HeartedSessions(@RequestHeader(value = "Authorization", required = false) String authorizationHeader){
        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUserName(token);
        return ResponseEntity.ok(agendaService.HeartedSessions(username));
    }


}
