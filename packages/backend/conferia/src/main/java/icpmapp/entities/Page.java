package icpmapp.entities;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "pages")
@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    @Lob
    @Column(name = "content", columnDefinition = ("TEXT"))
    private String content;
    private Integer layoutId;

    public Page(String messagesFromOrganizers, Integer l1, String s) {
        this.title = messagesFromOrganizers;
        this.layoutId = l1;
        this.content = s;

    }

    public Page() {

    }
}
