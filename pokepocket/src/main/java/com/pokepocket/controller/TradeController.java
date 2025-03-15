package com.pokepocket.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pokepocket.model.Trade;
import com.pokepocket.repository.TradeRepository;

@RestController
@RequestMapping("/api/trades")
public class TradeController {
    private final TradeRepository tradeRepository;

    public TradeController(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
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
}
