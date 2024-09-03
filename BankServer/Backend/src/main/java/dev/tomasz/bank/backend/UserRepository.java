package dev.tomasz.bank.backend;

import org.springframework.data.jpa.repository.JpaRepository;

// Utilizes Spring-Boot JPA CRUD repository 
public interface UserRepository extends JpaRepository<User, Integer> {
}
