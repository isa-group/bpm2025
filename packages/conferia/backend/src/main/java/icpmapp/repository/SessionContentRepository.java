package icpmapp.repository;

import icpmapp.entities.SessionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionContentRepository extends JpaRepository<SessionContent, Long> {
}
