package icpmapp.repository;

import icpmapp.entities.ArticleAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleAuthorRepository extends JpaRepository<ArticleAuthor, Integer> {

    @Query("SELECT aa FROM ArticleAuthor aa WHERE aa.article.id = :articleId ORDER BY aa.authorOrder ASC")
    List<ArticleAuthor> findByArticleId(@Param("articleId") Integer articleId);

    @Modifying
    @Query("DELETE FROM ArticleAuthor aa WHERE aa.article.id = :articleId")
    void deleteByArticleId(@Param("articleId") Integer articleId);
}
