package icpmapp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "article_authors")
@Entity
public class ArticleAuthor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "article_id", nullable = false)
  private Article article;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id", nullable = false)
  private Author author;

  @Column(name = "author_order", nullable = false)
  private Integer authorOrder; 

  @Column(name = "is_corresponding")
  private Boolean isCorresponding = false;

  @Column(name = "is_presenting")
  private Boolean isPresenting = false;

  public ArticleAuthor() {}

  public ArticleAuthor(Article article, Author author, Integer authorOrder) {
    this.article = article;
    this.author = author;
    this.authorOrder = authorOrder;
  }

  public ArticleAuthor(Article article, Author author, Integer authorOrder, Boolean isCorresponding) {
    this.article = article;
    this.author = author;
    this.authorOrder = authorOrder;
    this.isCorresponding = isCorresponding;
  }
}
