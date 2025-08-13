package icpmapp.services;

import icpmapp.dto.requests.AuthorRequest;
import icpmapp.dto.responses.AuthorResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AuthorService {
    AuthorResponse create(AuthorRequest request);

    AuthorResponse update(Integer id, AuthorRequest request);

    void delete(Integer id);

    Optional<AuthorResponse> findById(Integer id);

    Page<AuthorResponse> search(String search, Pageable pageable);
}
