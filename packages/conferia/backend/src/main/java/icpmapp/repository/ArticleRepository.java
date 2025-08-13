package icpmapp.repository;

import icpmapp.entities.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

  @Query("SELECT a FROM Article a WHERE LOWER(a.title) LIKE %:search%")
  Page<Article> searchArticles(@Param("search") String search, Pageable pageable);

  @Query("SELECT a FROM Article a JOIN a.articleAuthors aa JOIN aa.author author WHERE author.id = :authorId")
  List<Article> findByAuthorId(@Param("authorId") Integer authorId);

  @Query("SELECT a FROM Article a JOIN a.articleAuthors aa WHERE aa.author.user.id = :userId")
  List<Article> findByUserId(@Param("userId") Integer userId);
}
