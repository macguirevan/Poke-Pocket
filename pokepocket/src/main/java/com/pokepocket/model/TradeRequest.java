package com.pokepocket.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TradeRequest {
  private Integer tradeId;
  private String username;
  private Integer offeredCardId;
  private Integer requestedCard1Id;
  private Integer requestedCard2Id;
  private Integer requestedCard3Id;
  private Integer requestedCard4Id;
}
