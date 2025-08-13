package icpmapp.dto.requests;

import lombok.Data;

import java.util.List;

@Data
public class ArticleRequest {
    private String title;
    private String abstractText;
    private String doi;
    private String url;

    @Data
    public static class ArticleAuthorDTO {
        private Integer authorId; // existing author id
        private Integer authorOrder;
        private Boolean corresponding;
        private Boolean presenting;
    }

    private List<ArticleAuthorDTO> authors; // ordered authors list
}
