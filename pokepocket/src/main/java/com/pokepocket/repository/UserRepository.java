package com.pokepocket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pokepocket.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);

    User findByFriendId(String friendId);

    void deleteByUsername(String username);
}
