package icpmapp.services.impl;

import icpmapp.dto.requests.AuthorRequest;
import icpmapp.dto.responses.AuthorResponse;
import icpmapp.entities.Author;
import icpmapp.entities.User;
import icpmapp.repository.AuthorRepository;
import icpmapp.repository.UserRepository;
import icpmapp.services.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final UserRepository userRepository;

    @Override
    public AuthorResponse create(AuthorRequest request) {
        Author author = new Author();
        author.setFirstName(request.getFirstName());
        author.setLastName(request.getLastName());
        author.setEmail(request.getEmail());
        author.setAffiliation(request.getAffiliation());
        author.setOrcid(request.getOrcid());
        if (request.getUserId() != null) {
            Optional<User> user = userRepository.findById(request.getUserId());
            user.ifPresent(author::setUser);
        }
        Author saved = authorRepository.save(author);
        return toDto(saved);
    }

    @Override
    public AuthorResponse update(Integer id, AuthorRequest request) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        author.setFirstName(request.getFirstName());
        author.setLastName(request.getLastName());
        author.setEmail(request.getEmail());
        author.setAffiliation(request.getAffiliation());
        author.setOrcid(request.getOrcid());
        if (request.getUserId() != null) {
            Optional<User> user = userRepository.findById(request.getUserId());
            user.ifPresent(author::setUser);
        } else {
            author.setUser(null);
        }
        return toDto(authorRepository.save(author));
    }

    @Override
    public void delete(Integer id) {
        authorRepository.deleteById(id);
    }

    @Override
    public Optional<AuthorResponse> findById(Integer id) {
        return authorRepository.findById(id).map(this::toDto);
    }

    @Override
    public Page<AuthorResponse> search(String search, Pageable pageable) {
        Page<Author> page;
        if (search != null && !search.trim().isEmpty()) {
            page = authorRepository.searchAuthors(search.toLowerCase(), pageable);
        } else {
            page = authorRepository.findAll(pageable);
        }
        return page.map(this::toDto);
    }

    private AuthorResponse toDto(Author author) {
        AuthorResponse dto = new AuthorResponse();
        dto.setId(author.getId());
        dto.setFirstName(author.getFirstName());
        dto.setLastName(author.getLastName());
        dto.setFullName(author.getFullName());
        dto.setEmail(author.getEmail());
        dto.setAffiliation(author.getAffiliation());
        dto.setOrcid(author.getOrcid());
        if (author.getUser() != null)
            dto.setUserId(author.getUser().getId());
        return dto;
    }
}
