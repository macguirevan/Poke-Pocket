package com.pokepocket.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping
    public Trade createCard(@RequestBody Trade trade) {
        return tradeRepository.save(trade);
    }
}
