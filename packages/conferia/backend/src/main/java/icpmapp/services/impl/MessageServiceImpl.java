package icpmapp.services.impl;

import icpmapp.dto.requests.MessageRequest;
import icpmapp.dto.responses.MessageResponse;
import icpmapp.entities.Message;
import icpmapp.entities.User;
import icpmapp.repository.MessageRepository;
import icpmapp.repository.UserRepository;
import icpmapp.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.web.client.RestClientAutoConfiguration;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final RestClientAutoConfiguration restClientAutoConfiguration;

    @Override
    public List<MessageResponse> getMessages(User currentUser) {
        List<Message> list = messageRepository.findAll(Sort.by(Sort.Direction.DESC, "creationTime"));
        List<MessageResponse> responses = new LinkedList<>();
        list.forEach(msg -> {
            MessageResponse mr = convertToDto(msg);
            mr.setRead(msg.getReadBy().contains(currentUser));
            responses.add(mr);
        });
        return responses;
    }

    @Override
    public Message create(MessageRequest messageRequest, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));

        Message msg = new Message();
        msg.setAuthor(user);
        msg.setTitle(messageRequest.getTitle());
        msg.setText(messageRequest.getText());
        msg.setCreationTime(LocalDateTime.now());

        Message set = messageRepository.save(msg);
        read(set.getId(), user);

        return set;
    }

    @Override
    public boolean delete(Integer id, User userRequestingDelete) {
        Optional<Message> msg = messageRepository.findById(id);
        if (msg.isPresent() && (msg.get().getAuthor().getId() == userRequestingDelete.getId())) {

            msg.get().getReadBy().forEach(user -> user.getReadMessages().remove(msg.get()));
            msg.get().getReadBy().clear();
            userRepository.saveAll(msg.get().getReadBy());

            messageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean read(Integer id, User user) {
        Optional<Message> msg = messageRepository.findById(id);
        if (msg.isPresent()) {
            Message message = msg.get();
            if (message.getReadBy() == null || !message.getReadBy().contains(user)) {
                user.getReadMessages().add(message);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    private static MessageResponse convertToDto(Message msg) {
        MessageResponse resp = new MessageResponse();
        resp.setId(msg.getId());
        resp.setTitle(msg.getTitle());
        resp.setMessage(msg.getText());
        resp.setAuthor(msg.getAuthor().getFirstname() + " " + msg.getAuthor().getLastname());
        resp.setAvatar(msg.getAuthor().getAvatar_path() != null ? msg.getAuthor().getId() : null);
        resp.setAuthorId(msg.getAuthor().getId());
        resp.setDate(msg.getCreationTime());
        return resp;
    }
}
