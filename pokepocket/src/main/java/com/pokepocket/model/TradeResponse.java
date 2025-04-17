package com.pokepocket.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TradeResponse {
  private Integer tradeId;
  private String username;
  private Card offeredCard;
  private Card requestedCard1;
  private Card requestedCard2;
  private Card requestedCard3;
  private Card requestedCard4;
}