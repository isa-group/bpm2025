package icpmapp.controller;

import icpmapp.dto.requests.ArticleRequest;
import icpmapp.dto.responses.ArticleResponse;
import icpmapp.services.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
@Tag(name = "Articles", description = "Operations related to articles and their authors")
public class ArticleController {

    private final ArticleService articleService;

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "List articles", description = "Paginated list of articles with optional search by title substring")
    @ApiResponse(responseCode = "200", description = "Page of articles returned")
    @GetMapping
    public ResponseEntity<Page<ArticleResponse>> list(
            @Parameter(description = "Page index (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "50") int size,
            @Parameter(description = "Case-insensitive search substring applied to title") @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title"));
        return ResponseEntity.ok(articleService.search(search, pageable));
    }

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "Get article", description = "Retrieve a single article by id")
    @ApiResponse(responseCode = "200", description = "Article found")
    @ApiResponse(responseCode = "400", description = "Article not found", content = @Content)
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> get(@PathVariable Integer id) {
        return ResponseEntity
                .ok(articleService.findById(id).orElseThrow(() -> new IllegalArgumentException("Article not found")));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create article", description = "Create a new article (ADMIN only)")
    @ApiResponse(responseCode = "200", description = "Article created")
    @PostMapping
    public ResponseEntity<ArticleResponse> create(@RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.create(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Update article", description = "Update an existing article by id (ADMIN only)")
    @ApiResponse(responseCode = "200", description = "Article updated")
    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> update(@PathVariable Integer id, @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.update(id, request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete article", description = "Delete an article by id (ADMIN only)")
    @ApiResponse(responseCode = "204", description = "Article deleted", content = @Content)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "Articles by author", description = "List all articles for a given author id")
    @GetMapping("/by-author/{authorId}")
    public ResponseEntity<List<ArticleResponse>> byAuthor(@PathVariable Integer authorId) {
        return ResponseEntity.ok(articleService.findByAuthor(authorId));
    }

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "Articles by user", description = "List all articles for a given linked user id")
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<ArticleResponse>> byUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(articleService.findByUser(userId));
    }
}
