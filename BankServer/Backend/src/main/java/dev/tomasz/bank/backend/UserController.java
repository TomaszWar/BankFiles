package dev.tomasz.bank.backend;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    // Handles requests to create a new user for the bank applicaiton into the database
    @PostMapping("/create")
    public ResponseEntity<String> postUser(@RequestBody User user){
        try{
            userService.regiserUser(user);
        } catch (SQLIntegrityConstraintViolationException e) { // If a username is already in use prompts the user for a new username
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username Already In Use");
        }
        return ResponseEntity.ok("Account created successfully");
    }

    // Hanldes login request for bank application users
    @PostMapping("/loginRequest")
    public ResponseEntity<User> logIn(@RequestBody User user){
        Optional<User> userAccount = userService.findUserLogIn(user);

        if(userAccount.isPresent()){
            return ResponseEntity.ok(userAccount.get());
        }else{ // If a matching username and password is not found, prompts the user to try again
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Handles deposit requests for bank application users
    @PutMapping("/depositFunds")
    public ResponseEntity<String> deposit(@RequestBody User user){
        if(user.getBalance() < 0){ // If a negative value tries to be depositied an error is shown
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }else{
            userService.deposit(user.getUsername(), user.getBalance());
            return ResponseEntity.ok("Deposit successful");
        }
    }
    // Handles withdraw requests for bank application users
    @PutMapping("/withdrawFunds")
    public ResponseEntity<String> withdraw(@RequestBody User user){
        try{
            if(user.getBalance() < 0){ // If a negative value tries to be withdrawn an error is shown
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            userService.withdraw(user.getUsername(), user.getBalance());
            return ResponseEntity.ok("Withdraw Successful");
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    // Displays the databse entry of a specified username
    @GetMapping("/api/{username}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable String username){
        return this.userService.findUserByUsername(username);
    }

    // Displays all entries in the database
    @GetMapping("/api")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAll(){
        return this.userService.findAll();
    }
    // Handles updating usernames when requested by users.
    @PutMapping("/updateUsername/{username}")
    public ResponseEntity<String> updateUsername(@RequestBody User user, @PathVariable String username){
        try{ // Checks for accounts currently using the username that is being requested
            userService.findUserByUsername(username);
            // If found, prompts user to try a different username
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username Already In Use");
        }catch(NoSuchElementException e){ // If not found, updates the username of current user
            this.userService.updateUsername(user, username);
            return ResponseEntity.ok("Update successful");
        }
    }

    // Handles updating passwords when requestedby users
    @PutMapping("/updatePassword/{username}")
    public ResponseEntity<String> updatePassword(@RequestBody User user, @PathVariable String username){
        this.userService.updatePassword(user, username);

        return ResponseEntity.ok("Update successful");
    }
}
