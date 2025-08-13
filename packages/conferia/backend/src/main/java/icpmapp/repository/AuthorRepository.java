package icpmapp.repository;

import icpmapp.entities.Author;
import icpmapp.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
    
    Optional<Author> findByEmail(String email);
    
    Optional<Author> findByUser(User user);
    
    Optional<Author> findByFirstNameOrLastName(String firstName, String lastName);
    
    @Query("SELECT a FROM Author a WHERE LOWER(a.firstName) LIKE %:search% OR LOWER(a.lastName) LIKE %:search% OR LOWER(a.email) LIKE %:search% OR LOWER(a.affiliation) LIKE %:search%")
    Page<Author> searchAuthors(@Param("search") String search, Pageable pageable);
}
