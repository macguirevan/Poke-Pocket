package com.pokepocket.controller;

import java.util.List;

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



    @GetMapping("/{name}/image")
    public String getCardImage(@PathVariable String name) {
        Card card = cardRepository.findByName(name).orElseThrow(() -> new RuntimeException("Card not found"));
        return card.getCardImage();
    }

    // @GetMapping("/{id}/image")
    // public String getCardImage(@PathVariable Long id) {
    //     Card card = cardRepository.findById(id).orElseThrow(() -> new RuntimeException("Card not found"));
    //     return card.getCardImage();
    // }

    @PostMapping
    public List<Card> createCards(@RequestBody List<Card> cards) {
        return cardRepository.saveAll(cards);
    }
    
}
