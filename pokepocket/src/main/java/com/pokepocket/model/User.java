package com.pokepocket.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity //Turns this into a database table
@Table(name = "users")
@Getter //Enables all variables to have getters
@Setter //Enables all variables to have setters
@NoArgsConstructor //Constructor with no arguments
@AllArgsConstructor //Constructor with all arguments
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Integer userId;
  
  @Column(name = "friend_id", unique = true)
  private String friendId;
  
  @Column(name = "username", unique = true)
  private String username;
  
  @Column(name = "email", unique = true)
  private String email;

  @Column(name = "password")
  private String password;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Trade> trades;
}
