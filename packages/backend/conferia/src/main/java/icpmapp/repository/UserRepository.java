package icpmapp.repository;

import icpmapp.entities.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import icpmapp.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
     Page<User> findByLastnameContainingOrFirstnameContainingOrCountryContainingOrCompanyContaining(
                String lastname, String firstname, String country, String company, Pageable pageable);

    @Query("SELECT u FROM User u WHERE " +
            "(LOWER(u.firstname) LIKE %:search% OR LOWER(u.lastname) LIKE %:search%) OR " +
            "((LOWER(u.company) LIKE %:search% OR LOWER(u.country) LIKE %:search%) AND u.sharingchoice = TRUE)")
    Page<User> searchWithConditionalPrivacy(@Param("search") String search, Pageable pageable);

    Optional<User> findByEmail(String email);

    User findByRole(Role role);

}
