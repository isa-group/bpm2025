package icpmapp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Table(name = "articles")
@Entity
public class Article {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String title;

  @Lob
  @Column(name = "abstract", columnDefinition = "TEXT")
  private String abstractText;

  private String doi;

  private String url;

  @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @OrderBy("authorOrder ASC")
  private List<ArticleAuthor> articleAuthors;

  public Article() {
  }

  public Article(String title, String abstractText, String doi, String url) {
    this.title = title;
    this.abstractText = abstractText;
    this.doi = doi;
    this.url = url;
  }
}
