package com.pokepocket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pokepocket.model.Card;

public interface CardRepository extends JpaRepository<Card, Long>{
    Card findByCardId(Long cardId);
    Card findByName(String name);
}
