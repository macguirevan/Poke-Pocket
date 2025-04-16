package com.pokepocket.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pokepocket.model.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer>{
  Optional<Card> findByCardId(Integer cardId);
  
  List<Card> findByName(String name);
  
  List<Card> findBySetName(String setName);
  
  List<Card> findByRarity(Integer rarity);
}