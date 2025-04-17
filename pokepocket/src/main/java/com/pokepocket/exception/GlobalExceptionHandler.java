package com.pokepocket.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class GlobalExceptionHandler {

  private static final Pattern DUPLICATE_ENTRY_PATTERN = Pattern.compile("Duplicate entry '(.+)' for key '(.+)'");

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    Throwable rootCause = getRootCause(ex);

    if (rootCause instanceof SQLIntegrityConstraintViolationException) {
      String errorMessage = rootCause.getMessage();
      Matcher matcher = DUPLICATE_ENTRY_PATTERN.matcher(errorMessage);
          
      if (matcher.find()) {
        String duplicateValue = matcher.group(1);
        String keyName = matcher.group(2);
        String fieldName = extractFieldName(keyName);
        
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("status", "error");
        errorResponse.put("message", "duplicate entry");
        errorResponse.put("field", fieldName);
        errorResponse.put("detail", fieldName + " is already in use");
        
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
      }
      
      // Handle foreign key constraint failures
      if (errorMessage.contains("foreign key constraint")) {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "error");
        body.put("message", "Foreign key constraint violation");
        
        // Handle specific foreign key failures for trade operations
        if (errorMessage.contains("user_id")) {
          body.put("detail", "The specified user does not exist");
          body.put("field", "username");
        } else if (errorMessage.contains("card_id") || 
                  errorMessage.contains("requested_1") || 
                  errorMessage.contains("requested_2") || 
                  errorMessage.contains("requested_3") || 
                  errorMessage.contains("requested_4")) {
          
          String fieldName = "card";
          if (errorMessage.contains("card_id")) fieldName = "offeredCardId";
          else if (errorMessage.contains("requested_1")) fieldName = "requestedCard1Id";
          else if (errorMessage.contains("requested_2")) fieldName = "requestedCard2Id";
          else if (errorMessage.contains("requested_3")) fieldName = "requestedCard3Id";
          else if (errorMessage.contains("requested_4")) fieldName = "requestedCard4Id";
          
          body.put("detail", "The specified card does not exist");
          body.put("field", fieldName);
        }
        
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
      }
    }
      
    // Fallback for other integrity violations
    Map<String, String> errorResponse = new HashMap<>();
    errorResponse.put("status", "error");
    errorResponse.put("message", "Data integrity violation");
    errorResponse.put("detail", ex.getMostSpecificCause().getMessage());
    
    return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
  }
  
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    body.put("message", "Malformed JSON request");
    
    // Extract useful part of the error message
    String detailedMessage = ex.getMessage();
    if (detailedMessage != null && detailedMessage.contains(":")) {
      detailedMessage = detailedMessage.substring(0, detailedMessage.indexOf(":") + 1);
    }
    body.put("detail", detailedMessage);
    
    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }
  
  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    
    String parameterName = ex.getName();
    String requiredType = ex.getRequiredType() != null ? 
            ex.getRequiredType().getSimpleName() : "unknown";
    
    body.put("message", "Type mismatch");
    body.put("field", parameterName);
    body.put("detail", "Parameter '" + parameterName + "' must be of type " + requiredType);
    
    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }
  
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    body.put("message", "Invalid argument");
    body.put("detail", ex.getMessage());
    
    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }
  
  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<Object> handleNullPointer(NullPointerException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    body.put("message", "Server error");
    body.put("detail", "An unexpected error occurred while processing the request");
    
    return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  // Custom exception for trade operations
  @ExceptionHandler(TradeOperationException.class)
  public ResponseEntity<Object> handleTradeOperationException(TradeOperationException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    body.put("message", ex.getMessage());
    if (ex.getField() != null) {
      body.put("field", ex.getField());
    }
    
    return new ResponseEntity<>(body, ex.getStatus());
  }
  
  // Fallback exception handler
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleGenericException(Exception ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("status", "error");
    body.put("message", "Server error");
    body.put("detail", "An unexpected error occurred while processing your request");
    
    return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  private Throwable getRootCause(Throwable throwable) {
    Throwable cause = throwable.getCause();
    if (cause == null) {
      return throwable;
    }
    return getRootCause(cause);
  }
  
  private String extractFieldName(String keyName) {
    // Extract field name from the key
    // Example: "user_account.user_name" -> "username"
    if (keyName.contains(".")) {
      String[] parts = keyName.split("\\.");
      String columnName = parts[parts.length - 1];
        
      // Convert database column format to Java field format
      if (columnName.contains("_")) {
        StringBuilder result = new StringBuilder();
        String[] words = columnName.split("_");
        
        if (words[0].equals("trade") && words[1].equals("id")) {
          return "tradeId";
        }
        
        result.append(words[0]);
        for (int i = 1; i < words.length; i++) {
          result.append(words[i].substring(0, 1).toUpperCase()).append(words[i].substring(1));
        }
        
        return result.toString();
      }
      return columnName;
    }
    return keyName;
  }
}