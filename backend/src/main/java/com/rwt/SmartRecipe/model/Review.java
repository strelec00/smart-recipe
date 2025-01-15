package com.rwt.SmartRecipe.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "review_id")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "score")
    private Float score;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "upvotes")
    private Integer upvotes;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User createdBy;

    @JoinColumn(name = "recipe_id")
    @ManyToOne
    private Recipe reviewedRecipe;

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
