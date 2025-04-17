package com.pokepocket.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pokepocket.model.Card;
import com.pokepocket.model.Trade;
import com.pokepocket.model.TradeRequest;
import com.pokepocket.model.TradeResponse;
import com.pokepocket.model.User;
import com.pokepocket.repository.CardRepository;
import com.pokepocket.repository.TradeRepository;
import com.pokepocket.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/trades")
public class TradeController {

  private final TradeRepository tradeRepository;
  private final CardRepository cardRepository;
  private final UserRepository userRepository;

  public TradeController(TradeRepository tradeRepository, CardRepository cardRepository, UserRepository userRepository) {
    this.tradeRepository = tradeRepository;
    this.cardRepository = cardRepository;
    this.userRepository = userRepository;
  }

  @GetMapping
  public List<TradeResponse> getAllTrades() {
    List<Trade> trades = tradeRepository.findAll();
    return trades.stream()
            .map(this::convertToResponse)
            .toList();
  }

  @GetMapping("/{tradeId}")
  public ResponseEntity<?> getTradeById(@PathVariable Integer tradeId) {
    return tradeRepository.findById(tradeId)
            .map(trade -> ResponseEntity.ok(convertToResponse(trade)))
            .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/users/{userId}")
  public List<TradeResponse> getTradesByUserId(@PathVariable Integer userId) {
    List<Trade> trades = tradeRepository.findByUser_UserId(userId);
    return trades.stream()
            .map(this::convertToResponse)
            .toList();
  }

  @GetMapping("/username/{username}")
  public List<TradeResponse> getTradesByUsername(@PathVariable String username) {
    List<Trade> trades = tradeRepository.findByUser_Username(username);
    return trades.stream()
            .map(this::convertToResponse)
            .toList();
  }

  @PostMapping
  public ResponseEntity<?> createTrade(@RequestBody TradeRequest tradeRequest) {

    Optional<User> userOpt = userRepository.findByUsername(tradeRequest.getUsername());
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found.");
    }

    Optional<Card> offeredCardOpt = cardRepository.findById(tradeRequest.getOfferedCardId());
    if (offeredCardOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offered card not found.");
    }

    Optional<Card> requestedCard1Opt = cardRepository.findById(tradeRequest.getRequestedCard1Id());
    if (requestedCard1Opt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 1 is required and was not found.");
    }

    // Create and populate Trade object
    Trade trade = new Trade();
    trade.setUser(userOpt.get());
    trade.setOfferedCard(offeredCardOpt.get());
    trade.setRequestedCard1(requestedCard1Opt.get());

    if (tradeRequest.getRequestedCard2Id() != null) {
      Optional<Card> card2Opt = cardRepository.findById(tradeRequest.getRequestedCard2Id());
      if (card2Opt.isPresent()) {
        trade.setRequestedCard2(card2Opt.get());
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 2 not found.");
      }
    }

    if (tradeRequest.getRequestedCard3Id() != null) {
      Optional<Card> card3Opt = cardRepository.findById(tradeRequest.getRequestedCard3Id());
      if (card3Opt.isPresent()) {
        trade.setRequestedCard3(card3Opt.get());
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 3 not found.");
      }
    }

    if (tradeRequest.getRequestedCard4Id() != null) {
      Optional<Card> card4Opt = cardRepository.findById(tradeRequest.getRequestedCard4Id());
      if (card4Opt.isPresent()) {
        trade.setRequestedCard4(card4Opt.get());
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 4 not found.");
      }
    }

    Trade savedTrade = tradeRepository.save(trade);
    return ResponseEntity.ok(savedTrade);
  }

  @DeleteMapping("/{tradeId}")
  public ResponseEntity<?> deleteTrade(@PathVariable Integer tradeId) {
    if (!tradeRepository.existsById(tradeId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trade not found.");
    }
    tradeRepository.deleteById(tradeId);
    return ResponseEntity.ok("Trade deleted.");
  }

  @PatchMapping("/{tradeId}/{slotNum}/{cardId}")
  public ResponseEntity<?> updateRequestedCard(
          @PathVariable Integer tradeId,
          @PathVariable int slotNum,
          @PathVariable Integer cardId) {

    Optional<Trade> tradeOpt = tradeRepository.findById(tradeId);
    if (tradeOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trade not found.");
    }

    Optional<Card> cardOpt = cardRepository.findById(cardId);
    if (cardOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Card not found.");
    }

    Trade trade = tradeOpt.get();
    Card newCard = cardOpt.get();

    switch (slotNum) {
      case 1 -> trade.setRequestedCard1(newCard);
      case 2 -> trade.setRequestedCard2(newCard);
      case 3 -> trade.setRequestedCard3(newCard);
      case 4 -> trade.setRequestedCard4(newCard);
      default -> trade.setRequestedCard1(newCard);  // Optional: maybe reject bad slot numbers
    }

    Trade updatedTrade = tradeRepository.save(trade);
    return ResponseEntity.ok(updatedTrade);
  }

  private TradeResponse convertToResponse(Trade trade) {
    return new TradeResponse(
            trade.getTradeId(),
            trade.getUser().getUsername(),
            trade.getOfferedCard(),
            trade.getRequestedCard1(),
            trade.getRequestedCard2(),
            trade.getRequestedCard3(),
            trade.getRequestedCard4()
    );
  }
}