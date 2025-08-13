package icpmapp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Table(name = "authors")
@Entity
public class Author {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(unique = true)
  private String email;

  private String affiliation;

  private String orcid; 

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<ArticleAuthor> articleAuthors;

  public Author() {}

  public Author(String firstName, String lastName, String email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public Author(String firstName, String lastName, String email, String affiliation) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.affiliation = affiliation;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }
}
