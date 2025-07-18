package icpmapp.services.impl;

import icpmapp.dto.requests.PageRequest;
import icpmapp.entities.Page;
import icpmapp.repository.PageRepository;
import lombok.RequiredArgsConstructor;
import icpmapp.services.PageService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PageServiceImpl implements PageService {
    private final PageRepository pageRepository;


    public Page create(PageRequest pageRequest) {
        Page page = new Page();
        page.setTitle(pageRequest.getTitle());
        page.setContent(pageRequest.getContent());
        page.setLayoutId(pageRequest.getLayoutId());

        return pageRepository.save(page);
    }

    public void delete(Integer id) {
        pageRepository.deleteById(id);
    }

    public Optional<Page> findById(Integer id) {
        return pageRepository.findById(id);
    }

    public Page update(PageRequest updateRequest, Integer id){
        Page page = pageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Page not Found"));

        page.setTitle(updateRequest.getTitle());
        page.setContent(updateRequest.getContent());
        page.setLayoutId(updateRequest.getLayoutId());

        return pageRepository.save(page);
    }

}
