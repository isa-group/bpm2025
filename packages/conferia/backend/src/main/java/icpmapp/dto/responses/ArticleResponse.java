package icpmapp.dto.responses;

import lombok.Data;

import java.util.List;

@Data
public class ArticleResponse {
    private Integer id;
    private String title;
    private String abstractText;
    private String doi;
    private String url;

    @Data
    public static class ArticleAuthorDTO {
        private Integer authorId;
        private String firstName;
        private String lastName;
        private String fullName;
        private Integer authorOrder;
        private Boolean corresponding;
        private Boolean presenting;
    }

    private List<ArticleAuthorDTO> authors;
}
