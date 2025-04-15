package com.pokepocket.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pokepocket.model.User;
import com.pokepocket.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {

        // Parse login information
        String username = loginData.get("username");
        String password = loginData.get("password");

        User user = userRepository.findByUsername(username);

        // Check if user exists and if password matches
        if (user != null && user.getPassword().equals(password)) {
            return "Login successful"; // Optionally return JWT token or user details
        } else {
            return "Invalid username or password";
        }
    }

    @GetMapping("/userId/{userId}")
    public User getUserByUserId(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with userId labeled " + userId));
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user;
        } else {
            throw new RuntimeException("User not found with username named " + username);
        }
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userRepository.deleteByUsername(username);
    }
}
