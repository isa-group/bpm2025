package icpmapp.dto.requests;

import lombok.Data;

@Data
public class GetGalleryRequest {
    private int pageNr;
    private int pageSize;
}
