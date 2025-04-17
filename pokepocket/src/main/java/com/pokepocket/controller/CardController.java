package com.pokepocket.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pokepocket.model.Card;
import com.pokepocket.repository.CardRepository;

@RestController
@RequestMapping("/api/cards")
public class CardController {
  private final CardRepository cardRepository;
  
  public CardController(CardRepository cardRepository) {
    this.cardRepository = cardRepository;
  }
  
  @GetMapping
  public List<Card> getAllCards() {
    return cardRepository.findAll();
  }
  
  @GetMapping("/{cardId}")
  public ResponseEntity<Card> getCardById(@PathVariable Integer cardId) {
    return cardRepository.findByCardId(cardId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/name/{name}")
  public ResponseEntity<List<Card>> getCardsByName(@PathVariable String name) {
    List<Card> cards = cardRepository.findByNameContainingIgnoreCase(name);
    return cards.isEmpty()
            ? ResponseEntity.notFound().build()
            : ResponseEntity.ok(cards);
  }
  
  @GetMapping("/image/{id}")
  public ResponseEntity<String> getCardImage(@PathVariable Integer id) {
    return cardRepository.findById(id)
            .map(card -> ResponseEntity.ok(card.getCardImage()))
            .orElse(ResponseEntity.notFound().build());
  }
  
  @GetMapping("/set/{setName}")
  public ResponseEntity<List<Card>> getCardsBySetName(@PathVariable String setName) {
    List<Card> cards = cardRepository.findBySetName(setName);
    return cards.isEmpty() 
            ? ResponseEntity.notFound().build()
            : ResponseEntity.ok(cards);
  }
  
  @GetMapping("/rarity/{rarity}")
  public ResponseEntity<List<Card>> getCardsByRarity(@PathVariable Integer rarity) {
    List<Card> cards = cardRepository.findByRarity(rarity);
    return cards.isEmpty() 
            ? ResponseEntity.notFound().build()
            : ResponseEntity.ok(cards);
  }
  
  @PostMapping
  public ResponseEntity<List<Card>> createCards(@RequestBody List<Card> cards) {
    List<Card> savedCards = cardRepository.saveAll(cards);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedCards);
  }
}