package icpmapp.services;

import icpmapp.dto.requests.PageRequest;
import icpmapp.entities.Page;

import java.util.Optional;

public interface PageService {
    Page create(PageRequest pageRequest);

    void delete(Integer id);

    Optional<Page> findById(Integer id);

    Page update (PageRequest pageRequest, Integer id);

}

