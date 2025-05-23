package com.pokepocket.model;

import jakarta.persistence.*;
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
  @Column(name = "card_id")
  private Integer cardId;
  
  @Column(name = "name", nullable = false)
  private String name;
  
  // Store the URL of the image in here
  @Column(name = "card_image", nullable = false, unique = true)
  private String cardImage;
  
  // Rarity has a value of int because it makes comparisons faster
  @Column(name = "rarity", nullable = false)
  private Integer rarity;
  
  @Column(name = "set_name", nullable = false)
  private String setName;
}