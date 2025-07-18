package icpmapp.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class SessionHeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String host;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    private SessionType type;
    @ManyToMany(mappedBy = "likedBy")
    private List<User> likes;
    @OneToOne(mappedBy = "header", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private SessionContent content;

    public SessionHeader(LocalDateTime of, LocalDateTime of1, String alice, String mainHall, String openingKeynote, SessionType type) {
        this.startTime = of;
        this.endTime = of1;
        this.host = alice;
        this.location = mainHall;
        this.name = openingKeynote;
        this.type = type;
    }

    public SessionHeader() {
    }
}
