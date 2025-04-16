package com.pokepocket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "trade_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Trade {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trade_id")
  private Integer tradeId;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
  @JsonBackReference
  private User user;

  @ManyToOne
  @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false)
  private Card offeredCard;

  @ManyToOne
  @JoinColumn(name = "requested_1", referencedColumnName = "card_id")
  private Card requestedCard1;

  @ManyToOne
  @JoinColumn(name = "requested_2", referencedColumnName = "card_id")
  private Card requestedCard2;

  @ManyToOne
  @JoinColumn(name = "requested_3", referencedColumnName = "card_id")
  private Card requestedCard3;

  @ManyToOne
  @JoinColumn(name = "requested_4", referencedColumnName = "card_id")
  private Card requestedCard4;
}
