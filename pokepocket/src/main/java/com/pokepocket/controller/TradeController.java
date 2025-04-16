// package com.pokepocket.controller;

// import java.util.List;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.pokepocket.model.Card;
// import com.pokepocket.model.Trade;
// import com.pokepocket.model.TradeRequest;
// import com.pokepocket.model.User;
// import com.pokepocket.repository.CardRepository;
// import com.pokepocket.repository.TradeRepository;
// import com.pokepocket.repository.UserRepository;

// @RestController
// @RequestMapping("/api/trades")
// public class TradeController {
//     private final TradeRepository tradeRepository;
//     private final CardRepository cardRepository;
//     private final UserRepository userRepository;

//     public TradeController(TradeRepository tradeRepository, CardRepository cardRepository, UserRepository userRepository) {
//         this.tradeRepository = tradeRepository;
//         this.cardRepository = cardRepository;
//         this.userRepository = userRepository;
//     }

//     @GetMapping
//     public List<Trade> getAllTrades() {
//         return tradeRepository.findAll();
//     }

//     // Get the contents of a specific trade
//     @GetMapping("/{tradeId}")
//     public Trade getTradeById(@PathVariable Long tradeId) {
//         return tradeRepository.findById(tradeId)
//                 .orElseThrow(() -> new RuntimeException("Trade not found."));
//     }

//     // Get all trades by a user. 
//     @GetMapping("/users/{userId}")
//     public List<Trade> getTradesByUserId(@PathVariable Long userId) {
//         return tradeRepository.findByUser_UserId(userId);
//     }

//     @PostMapping
//     public ResponseEntity<?> createTrade(@RequestBody TradeRequest tradeRequest) {
        
//         // Find user by username
//         User user = userRepository.findByUsername(tradeRequest.getUsername());
//         if (user == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
//         }
    
//         // Find offered card
//         Card offeredCard = cardRepository.findByCardId(tradeRequest.getOfferedCardId());
//         if (offeredCard == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offered card not found");
//         }
    
//         // Find requested card 1
//         Card requestedCard1 = cardRepository.findByCardId(tradeRequest.getRequestedCard1Id());
//         if (requestedCard1 == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card not found");
//         }
    
//         // Create trade object and set properties
//         Trade trade = new Trade();
//         trade.setUser(user);
//         trade.setOfferedCard(offeredCard);
//         trade.setRequestedCard1(requestedCard1);
    
//         // Optional requested cards (2, 3, 4)
//         if (tradeRequest.getRequestedCard2Id() != null) {
//             Card requestedCard2 = cardRepository.findByCardId(tradeRequest.getRequestedCard2Id());
//             if (requestedCard2 != null) {
//                 trade.setRequestedCard2(requestedCard2);
//             } else {
//                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 2 not found");
//             }
//         }
    
//         if (tradeRequest.getRequestedCard3Id() != null) {
//             Card requestedCard3 = cardRepository.findByCardId(tradeRequest.getRequestedCard3Id());
//             if (requestedCard3 != null) {
//                 trade.setRequestedCard3(requestedCard3);
//             } else {
//                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 3 not found");
//             }
//         }
    
//         if (tradeRequest.getRequestedCard4Id() != null) {
//             Card requestedCard4 = cardRepository.findByCardId(tradeRequest.getRequestedCard4Id());
//             if (requestedCard4 != null) {
//                 trade.setRequestedCard4(requestedCard4);
//             } else {
//                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested card 4 not found");
//             }
//         }
    
//         // Save the trade
//         Trade savedTrade = tradeRepository.save(trade);
//         return ResponseEntity.ok(savedTrade);
//     }

//     @DeleteMapping("/{tradeId}")
//     public void deleteTrade(@PathVariable Long tradeId) {
//         tradeRepository.deleteById(tradeId);
//     }

//     @PatchMapping("/{tradeId}/{slotNum}/{cardId}")
//     public Trade updateRequestedCard(@PathVariable Long tradeId, @PathVariable int slotNum, @PathVariable Long cardId) {
//         Trade trade = tradeRepository.findById(tradeId)
//                 .orElseThrow(() -> new RuntimeException("Trade not found."));

//         Card newCard = cardRepository.findById(cardId)
//                 .orElseThrow(() -> new RuntimeException("Card not found."));

//         switch(slotNum) {
//             case 1 -> trade.setRequestedCard1(newCard);
//             case 2 -> trade.setRequestedCard2(newCard);
//             case 3 -> trade.setRequestedCard3(newCard);
//             case 4 -> trade.setRequestedCard4(newCard);
//             default -> trade.setRequestedCard1(newCard);
//         }
        
//         return tradeRepository.save(trade);
//     }
// }
