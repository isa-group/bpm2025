package icpmapp.controller;

import icpmapp.dto.requests.AuthorRequest;
import icpmapp.dto.responses.AuthorResponse;
import icpmapp.services.AuthorService;
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

@RestController
@RequestMapping("/api/v1/authors")
@RequiredArgsConstructor
@Tag(name = "Authors", description = "Operations related to authors")
public class AuthorController {

    private final AuthorService authorService;

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "List authors", description = "Paginated list of authors with optional search across name, email, affiliation")
    @ApiResponse(responseCode = "200", description = "Page of authors returned")
    @GetMapping
    public ResponseEntity<Page<AuthorResponse>> list(
            @Parameter(description = "Page index (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "50") int size,
            @Parameter(description = "Case-insensitive search substring") @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("lastName"));
        return ResponseEntity.ok(authorService.search(search, pageable));
    }

    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @Operation(summary = "Get author", description = "Retrieve a single author by id")
    @ApiResponse(responseCode = "200", description = "Author found")
    @ApiResponse(responseCode = "400", description = "Author not found", content = @Content)
    @GetMapping("/{id}")
    public ResponseEntity<AuthorResponse> get(@PathVariable Integer id) {
        return ResponseEntity
                .ok(authorService.findById(id).orElseThrow(() -> new IllegalArgumentException("Author not found")));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create author", description = "Create a new author (ADMIN only)")
    @ApiResponse(responseCode = "200", description = "Author created")
    @PostMapping
    public ResponseEntity<AuthorResponse> create(@RequestBody AuthorRequest request) {
        return ResponseEntity.ok(authorService.create(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Update author", description = "Update an existing author (ADMIN only)")
    @ApiResponse(responseCode = "200", description = "Author updated")
    @PutMapping("/{id}")
    public ResponseEntity<AuthorResponse> update(@PathVariable Integer id, @RequestBody AuthorRequest request) {
        return ResponseEntity.ok(authorService.update(id, request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete author", description = "Delete an author (ADMIN only)")
    @ApiResponse(responseCode = "204", description = "Author deleted", content = @Content)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
