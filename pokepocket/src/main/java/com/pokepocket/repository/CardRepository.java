package com.pokepocket.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pokepocket.model.Card;

public interface CardRepository extends JpaRepository<Card, Long>{
    Card findByCardId(Long cardId);
    Optional<Card> findByName(String name);
}
