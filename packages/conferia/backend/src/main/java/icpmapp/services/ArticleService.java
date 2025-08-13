package icpmapp.services;

import icpmapp.dto.requests.ArticleRequest;
import icpmapp.dto.responses.ArticleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ArticleService {
    ArticleResponse create(ArticleRequest request);

    ArticleResponse update(Integer id, ArticleRequest request);

    void delete(Integer id);

    Optional<ArticleResponse> findById(Integer id);

    Page<ArticleResponse> search(String search, Pageable pageable);

    List<ArticleResponse> findByAuthor(Integer authorId);

    List<ArticleResponse> findByUser(Integer userId);
}
