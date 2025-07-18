package icpmapp.services;

import icpmapp.dto.SessionDTO;
import icpmapp.dto.SessionHeaderDTO;
import icpmapp.entities.SessionHeader;

import java.util.List;

public interface AgendaService {
    SessionDTO findById(Long id);

    SessionHeader update(SessionDTO sessionDTO, Long id);

    SessionHeader create(SessionDTO sessionDTO);

    List<SessionHeaderDTO> fetchAll();

    void changeLikeStatusForSession(Boolean likes, String username, Long sessionId);

    List<SessionHeaderDTO> findLikedSessionsByUser(Integer userID);

    List<Long> HeartedSessions (String userName);

    }
