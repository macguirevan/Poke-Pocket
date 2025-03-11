package com.pokepocket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pokepocket.model.Trade;

public interface TradeRepository extends JpaRepository<Trade, Long>{
    Trade findByTradeId(String tradeId);
}

