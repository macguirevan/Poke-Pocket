package com.pokepocket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cards")
@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false)
    private String name;

    // Store the URL of the image in here
    @Column(nullable = false, unique = true)
    private String cardImage;

    // Rarity has a value of int because it makes comparisons faster
    @Column(nullable = false)
    private String rarity;

    @Column(nullable = false)
    private String setName;
}

