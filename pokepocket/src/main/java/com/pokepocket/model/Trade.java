package com.pokepocket.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trade-listings")
@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tradeId;  

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "offeredCard", referencedColumnName = "cardId", nullable = false)
    private Card offeredCard;

    @ManyToOne
    @JoinColumn(name = "requestedCard1", referencedColumnName = "cardId")
    private Card requestedCard1;

    @ManyToOne
    @JoinColumn(name = "requestedCard2", referencedColumnName = "cardId")
    private Card requestedCard2;

    @ManyToOne
    @JoinColumn(name = "requestedCard3", referencedColumnName = "cardId")
    private Card requestedCard3;

    @ManyToOne
    @JoinColumn(name = "requestedCard4", referencedColumnName = "cardId")
    private Card requestedCard4;
}
