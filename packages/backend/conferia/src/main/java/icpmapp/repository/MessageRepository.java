package icpmapp.repository;

import icpmapp.entities.Message;
import icpmapp.entities.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDateTime;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(
            value = "SELECT COUNT(m.id) FROM messages m WHERE m.creation_time >= :date",
            nativeQuery = true)
    Integer getMessagesAfterDate(@Param("date") LocalDateTime date);

    @Query(
            value = "SELECT COUNT(m.id) AS unread_messages_count " +
                    "FROM messages m " +
                    "LEFT JOIN read_messages mr ON m.id = mr.message_id AND mr.user_id = :user " +
                    "WHERE mr.message_id IS NULL",
            nativeQuery = true)
    Integer getMessagesNotReadByUser(@Param("user") Integer user);
}
