package com.rwt.SmartRecipe.model;

import com.rwt.SmartRecipe.dto.user.UserDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.security.SecurityProperties;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recipe")
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "title")
    private String title;

    @Column(name = "image")
    private String image;

    @ElementCollection
    @Column(name = "ingredients")
    private List<String> ingredients;

    @Column(name = "steps")
    private String steps;

    @ElementCollection
    @Column(name = "tags")
    private List<String> tags;
}
