package icpmapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    //stuff like role adjustments, system health etc. when we get there.
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi ADMIN");
    }
}
