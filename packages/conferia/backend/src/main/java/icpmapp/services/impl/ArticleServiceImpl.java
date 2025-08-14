package icpmapp.services.impl;

import icpmapp.dto.requests.ArticleRequest;
import icpmapp.dto.responses.ArticleResponse;
import icpmapp.entities.Article;
import icpmapp.entities.ArticleAuthor;
import icpmapp.entities.Author;
import icpmapp.repository.ArticleAuthorRepository;
import icpmapp.repository.ArticleRepository;
import icpmapp.repository.AuthorRepository;
import icpmapp.services.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final AuthorRepository authorRepository;
    private final ArticleAuthorRepository articleAuthorRepository;

    @Override
    @Transactional
    public ArticleResponse create(ArticleRequest request) {
        Article article = new Article();
        article.setTitle(request.getTitle());
        article.setAbstractText(request.getAbstractText());
        article.setDoi(request.getDoi());
        article.setUrl(request.getUrl());
        Article saved = articleRepository.save(article);

        if (request.getAuthors() != null) {
            List<ArticleAuthor> links = new ArrayList<>();
            for (ArticleRequest.ArticleAuthorDTO dto : request.getAuthors()) {
                Author author = authorRepository.findById(dto.getAuthorId())
                        .orElseThrow(() -> new IllegalArgumentException("Author not found: " + dto.getAuthorId()));
                ArticleAuthor aa = new ArticleAuthor();
                aa.setArticle(saved);
                aa.setAuthor(author);
                aa.setAuthorOrder(dto.getAuthorOrder());
                aa.setIsCorresponding(Boolean.TRUE.equals(dto.getCorresponding()));
                aa.setIsPresenting(Boolean.TRUE.equals(dto.getPresenting()));
                links.add(aa);
            }
            articleAuthorRepository.saveAll(links);
            saved.setArticleAuthors(links);
        }
        return toDto(saved);
    }

    @Override
    @Transactional
    public ArticleResponse update(Integer id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Article not found with id: " + id));
        article.setTitle(request.getTitle());
        article.setAbstractText(request.getAbstractText());
        article.setDoi(request.getDoi());
        article.setUrl(request.getUrl());
        Article saved = articleRepository.save(article);

        // replace authors
        articleAuthorRepository.deleteByArticleId(saved.getId());
        if (request.getAuthors() != null) {
            List<ArticleAuthor> links = new ArrayList<>();
            for (ArticleRequest.ArticleAuthorDTO dto : request.getAuthors()) {
                Author author = authorRepository.findById(dto.getAuthorId())
                        .orElseThrow(() -> new IllegalArgumentException("Author not found: " + dto.getAuthorId()));
                ArticleAuthor aa = new ArticleAuthor();
                aa.setArticle(saved);
                aa.setAuthor(author);
                aa.setAuthorOrder(dto.getAuthorOrder());
                aa.setIsCorresponding(Boolean.TRUE.equals(dto.getCorresponding()));
                aa.setIsPresenting(Boolean.TRUE.equals(dto.getPresenting()));
                links.add(aa);
            }
            articleAuthorRepository.saveAll(links);
            saved.setArticleAuthors(links);
        } else {
            saved.setArticleAuthors(new ArrayList<>());
        }
        return toDto(saved);
    }

    @Override
    public void delete(Integer id) {
        articleRepository.deleteById(id);
    }

    @Override
    public Optional<ArticleResponse> findById(Integer id) {
        return articleRepository.findById(id).map(this::toDto);
    }

    @Override
    public Page<ArticleResponse> search(String search, Pageable pageable) {
        Page<Article> page;
        if (search != null && !search.trim().isEmpty()) {
            page = articleRepository.searchArticles(search.toLowerCase(), pageable);
        } else {
            page = articleRepository.findAll(pageable);
        }
        return page.map(this::toDto);
    }

    @Override
    public List<ArticleResponse> findByAuthor(Integer authorId) {
        return articleRepository.findByAuthorId(authorId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ArticleResponse> findByUser(Integer userId) {
        return articleRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    private ArticleResponse toDto(Article article) {
        ArticleResponse dto = new ArticleResponse();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setAbstractText(article.getAbstractText());
        dto.setDoi(article.getDoi());
        dto.setUrl(article.getUrl());
        if (article.getArticleAuthors() != null) {
            List<ArticleResponse.ArticleAuthorDTO> authors = article.getArticleAuthors().stream()
                    .filter(Objects::nonNull)
                    .filter(aa -> aa.getAuthor() != null)
                    .map(aa -> {
                        ArticleResponse.ArticleAuthorDTO a = new ArticleResponse.ArticleAuthorDTO();
                        a.setAuthorId(aa.getAuthor().getId());
                        a.setFirstName(aa.getAuthor().getFirstName());
                        a.setLastName(aa.getAuthor().getLastName());
                        a.setFullName(aa.getAuthor().getFullName());
                        a.setAuthorOrder(aa.getAuthorOrder());
                        a.setCorresponding(Boolean.TRUE.equals(aa.getIsCorresponding()));
                        a.setPresenting(Boolean.TRUE.equals(aa.getIsPresenting()));
                        return a;
                    })
                    .sorted((a1, a2) -> Integer.compare(a1.getAuthorOrder(), a2.getAuthorOrder()))
                    .collect(Collectors.toList());
            dto.setAuthors(authors);
        }
        return dto;
    }
}
