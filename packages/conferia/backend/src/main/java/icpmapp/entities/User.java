package icpmapp.entities;
import lombok.Data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String company;
    private String country;
    private Boolean sharingchoice = false;
    private String avatar_path;
    @OneToMany(mappedBy = "owner")
    private List<GalleryImage> galleryImages;
    @Enumerated(EnumType.STRING)
    private Role role;
    @ManyToMany(mappedBy = "likedBy", fetch = FetchType.LAZY)
    private List<GalleryImage> likes;
    @OneToMany(mappedBy = "author")
    private List<Message> messages;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "session_likes",
            joinColumns = @JoinColumn(name = "sessionheader_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<SessionHeader> likedBy;
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "read_messages",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "message_id")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Message> readMessages;
    private LocalDateTime lastDownloadMessages;
    private LocalDateTime lastDownloadPictures;

    public User() { }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    public User(String country, String company, String email, String firstname, String lastname, Boolean sharingchoice) {
        this.country = country;
        this.company = company;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.sharingchoice = sharingchoice;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
