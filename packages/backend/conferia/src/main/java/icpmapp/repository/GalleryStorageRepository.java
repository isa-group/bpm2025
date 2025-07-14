package icpmapp.repository;

import icpmapp.entities.GalleryImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface GalleryStorageRepository extends JpaRepository<GalleryImage, Integer> {
    Optional<GalleryImage> findByPath(String path);

    @Query("SELECT gi FROM GalleryImage gi " +
            "JOIN gi.owner owner " +
            "LEFT JOIN gi.likedBy likes " +
            "WHERE (:search IS NULL OR :search = '' OR " +
            "LOWER(owner.firstname) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(owner.lastname) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(owner.firstname, ' ', owner.lastname)) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "GROUP BY gi.id, owner.firstname, owner.lastname, owner.id, gi.uploadTime, gi.path")
    Page<GalleryImage> searchGalleryImages(@Param("search") String search, Pageable pageable);

    @Query(
            value = "SELECT COUNT(gi.id) FROM gallery_images gi WHERE gi.upload_time >= :date",
            nativeQuery = true)
    Integer getPicturesAfterDate(@Param("date") LocalDateTime date);
}
