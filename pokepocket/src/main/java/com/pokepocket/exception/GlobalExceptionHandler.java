package com.pokepocket.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
    }
      
    // Fallback for other integrity violations
    Map<String, String> errorResponse = new HashMap<>();
    errorResponse.put("status", "error");
    errorResponse.put("message", "Data integrity violation");
    errorResponse.put("detail", ex.getMostSpecificCause().getMessage());
    
    return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
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
        
        result.append(words[0].toLowerCase());
        result.append(words[1].toLowerCase());
        
        return result.toString();
      }
      return columnName.toLowerCase();
    }
    return keyName;
  }
}