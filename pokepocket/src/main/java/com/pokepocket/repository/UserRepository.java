package com.pokepocket.repository;

import com.pokepocket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByFriendId(String friendId);
  
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);
  
  boolean existsByUsername(String username);
  
  boolean existsByEmail(String email);
  
  boolean existsByFriendId(String friendId);
}