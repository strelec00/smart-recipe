package com.rwt.SmartRecipe.model;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recipe")
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "recipe_id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "title")
    private String title;

    @Column(name = "image")
    private String image;

    @Type(ListArrayType.class)
    @Column(name = "ingredients", columnDefinition = "text[]")
    private List<String> ingredients = new ArrayList<>();

    @Column(name = "steps")
    private String steps;

    @Type(ListArrayType.class)
    @Column(name = "tags", columnDefinition = "text[]")
    private List<String> tags = new ArrayList<>();

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
