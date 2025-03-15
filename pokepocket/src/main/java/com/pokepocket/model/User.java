package com.pokepocket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity //Turns this into a database table
@Table(name = "users")
@Getter //Enables all variables to have getters
@Setter //Enables all variables to have setters
@NoArgsConstructor //Constructor with no arguments
@AllArgsConstructor //Constructor with all arguments
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;  // Auto-increment primary key

    @Column(nullable = false, unique = true)
    private String friendId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private Double rating; // User rating (e.g., 4.5)
}
