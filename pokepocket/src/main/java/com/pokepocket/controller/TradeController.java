package com.pokepocket.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pokepocket.model.Card;
import com.pokepocket.model.Trade;
import com.pokepocket.repository.CardRepository;
import com.pokepocket.repository.TradeRepository;

@RestController
@RequestMapping("/api/trades")
public class TradeController {
    private final TradeRepository tradeRepository;
    private final CardRepository cardRepository;

    public TradeController(TradeRepository tradeRepository, CardRepository cardRepository) {
        this.tradeRepository = tradeRepository;
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    // Get the contents of a specific trade
    @GetMapping("/{tradeId}")
    public Trade getTradeById(@PathVariable Long tradeId) {
        return tradeRepository.findById(tradeId)
                .orElseThrow(() -> new RuntimeException("Trade not found."));
    }

    // Get all trades by a user. 
    @GetMapping("/user/{userId}")
    public List<Trade> getTradesByUserId(@PathVariable Long userId) {
        return tradeRepository.findByUser_UserId(userId);
    }

    @PostMapping
    public Trade createCard(@RequestBody Trade trade) {
        return tradeRepository.save(trade);
    }

    @DeleteMapping("/{tradeId}")
    public void deleteTrade(@PathVariable Long tradeId) {
        tradeRepository.deleteById(tradeId);
    }

    @PatchMapping("/{tradeId}/{slotNum}/{cardId}")
    public Trade updateRequestedCard(@PathVariable Long tradeId, @PathVariable int slotNum, @PathVariable Long cardId) {
        Trade trade = tradeRepository.findById(tradeId)
                .orElseThrow(() -> new RuntimeException("Trade not found."));

        Card newCard = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found."));

        switch(slotNum) {
            case 1 -> trade.setRequestedCard1(newCard);
            case 2 -> trade.setRequestedCard2(newCard);
            case 3 -> trade.setRequestedCard3(newCard);
            case 4 -> trade.setRequestedCard4(newCard);
            default -> trade.setRequestedCard1(newCard);
        }
        
        return tradeRepository.save(trade);
    }
}
