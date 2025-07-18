package icpmapp.controller;


import lombok.RequiredArgsConstructor;
import icpmapp.entities.Page;
import icpmapp.repository.PageRepository;
import icpmapp.services.PageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import icpmapp.dto.requests.PageRequest;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pages")
@RequiredArgsConstructor
public class PageController {
    private final PageService pageService;
    private final PageRepository pageRepository;

    //CRUD operations for managing page content.
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Page> createPage (@RequestBody PageRequest pageRequest) {
        return ResponseEntity.ok(pageService.create(pageRequest));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Page> updatePage (@PathVariable Integer id, @RequestBody PageRequest pageRequest) {
        return ResponseEntity.ok(pageService.update(pageRequest, id));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Page> getPageById(@PathVariable Integer id) {
        return ResponseEntity.ok(pageService.findById(id).orElseThrow(() -> new RuntimeException("Page not found")));
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<Page>> getPages() {
        List<Page> pages = pageRepository.findAll();
        return ResponseEntity.ok(pages);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePage(@PathVariable Integer id) {
        pageService.delete(id);
        return ResponseEntity.ok("Page deleted with id: " + id);
    }

}
