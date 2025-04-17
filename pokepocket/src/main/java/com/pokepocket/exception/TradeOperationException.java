package com.pokepocket.exception;

import org.springframework.http.HttpStatus;

public class TradeOperationException extends RuntimeException {
    private final HttpStatus status;
    private final String field;
    
    public TradeOperationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.field = null;
    }
    
    public TradeOperationException(String message, String field, HttpStatus status) {
        super(message);
        this.status = status;
        this.field = field;
    }
    
    public HttpStatus getStatus() {
        return status;
    }
    
    public String getField() {
        return field;
    }
}