package icpmapp.services;

import icpmapp.dto.requests.MessageRequest;
import icpmapp.dto.responses.MessageResponse;
import icpmapp.entities.Message;
import icpmapp.entities.User;

import java.util.List;

public interface MessageService {

    List<MessageResponse> getMessages(User currentUser);

    Message create(MessageRequest messageRequest, String username);

    boolean delete(Integer id, User userRequestingDelete);

    boolean read(Integer id, User user);
}
