package com.pokepocket.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pokepocket.model.Trade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer>{
  // Find a trade by its ID
  Optional<Trade> findByTradeId(Integer tradeId);

  // Finds all trades that match the user id
  List<Trade> findByUser_UserId(Integer userId);

  // Finds all trades that match the username
  List<Trade> findByUser_Username(String username);

  // Check if a trade exists by trade ID
  boolean existsByTradeId(Integer tradeId);
}
