package icpmapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class SessionContent {

        @Id
        private Long id;

        @Lob
        @Column(name = "content", columnDefinition = ("TEXT"))
        private String content;
        //additional needed fields ?

        @OneToOne(fetch = FetchType.LAZY)
        @MapsId
        @JoinColumn(name = "id")
        @JsonIgnore
        private SessionHeader header;

        public SessionContent(String content, SessionHeader header) {
                this.content = content;
                this.header = header;
        }

        public SessionContent() {

        }
}
