package icpmapp.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Table(name = "galleryImages")
@Entity
public class GalleryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner")
    private User owner;

    private String path;

    private LocalDateTime uploadTime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "image_likes",
            joinColumns = @JoinColumn(name = "image_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> likedBy;

    private int likeCount;

    public void addLike(User user) {
        this.likedBy.add(user);
        this.likeCount = this.likedBy.size(); // Update like count when adding a like
    }

    public void removeLike(User user) {
        this.likedBy.remove(user);
        this.likeCount = this.likedBy.size(); // Update like count when removing a like
    }
}
