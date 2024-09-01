package dev.tomasz.bank.backend;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JdbcClient jdbc;

    public UserService(UserRepository userRepository, JdbcClient jdbc) {
        this.userRepository = userRepository;
        this.jdbc = jdbc;
    }

    // Takes in JSON body data and creates a User to save to the database
    public void saveUser (User user){
        userRepository.save(user);
    }

    public void regiserUser(User user) throws SQLIntegrityConstraintViolationException {
        userRepository.save(user);
    }

    // Update the user with new attributes
    public User update(User user){
        return userRepository.save(user);
    }

    // Finds a user to be logged in by comparing usernames and passwords
    public Optional<User> findUserLogIn(User user){
        return jdbc.sql("SELECT * FROM customers WHERE username = :username AND password = :password")
                .param("username", user.getUsername())
                .param("password", user.getPassword())
                .query(User.class)
                .optional();
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    // Finds a user by only username, will only be used when user is logged in
    public User findUserByUsername(String username){
        return jdbc.sql("SELECT * FROM customers WHERE username = :username")
                .param("username", username)
                .query(User.class)
                .optional()
                .get();
    }
    public void deposit(String username, Double value){
        User toUpdate = findUserByUsername(username);
        double newBalance = toUpdate.getBalance() + value;
        toUpdate.setBalance(newBalance);

        saveUser(toUpdate);
    }

    // Updates the value of a given users balance by removing a specified amount
    public void withdraw(String username, Double value) throws IllegalArgumentException {
        User toUpdate = findUserByUsername(username);
        if(value > toUpdate.getBalance()){
            throw new IllegalArgumentException("Insufficient Funds");
        }
        value *= -1;
        double newBalance = toUpdate.getBalance() + value;
        toUpdate.setBalance(newBalance);
        saveUser(toUpdate);
    }

    public void updateUsername(User user, String newUsername){
        user = this.findUserByUsername(user.getUsername());
        user.setUsername(newUsername);
        saveUser(user);
    }

    public void updatePassword(User user, String username){
        String newPassword = user.getPassword();
        user = this.findUserByUsername(username);
        user.setPassword(newPassword);
        saveUser(user);
    }

}
