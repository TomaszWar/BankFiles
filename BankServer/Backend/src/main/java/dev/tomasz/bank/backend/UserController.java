package dev.tomasz.bank.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> postUser(@RequestBody User user){
        try{
            userService.regiserUser(user);
        } catch (SQLIntegrityConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username Already In Use");
        }
        return ResponseEntity.ok("Account created successfully");
    }

    @PostMapping("/loginRequest")
    public ResponseEntity<User> logIn(@RequestBody User user){
        Optional<User> userAccount = userService.findUserLogIn(user);

        if(userAccount.isPresent()){
            return ResponseEntity.ok(userAccount.get());
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/depositFunds")
    public ResponseEntity<String> deposit(@RequestBody User user){
        if(user.getBalance() < 0){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }else{
            userService.deposit(user.getUsername(), user.getBalance());
            return ResponseEntity.ok("Deposit successful");
        }
    }

    @PutMapping("/withdrawFunds")
    public ResponseEntity<String> withdraw(@RequestBody User user){
        try{
            if(user.getBalance() < 0){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            userService.withdraw(user.getUsername(), user.getBalance());
            return ResponseEntity.ok("Withdraw Successful");
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @GetMapping("/api/{username}")
    public User getUser(@PathVariable String username){
        return this.userService.findUserByUsername(username);
    }

    @GetMapping("/api")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAll(){
        return this.userService.findAll();
    }

    @PutMapping("/updateUsername/{username}")
    public ResponseEntity<String> updateUsername(@RequestBody User user, @PathVariable String username){
        try{
            userService.findUserByUsername(username);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username Already In Use");
        }catch(NoSuchElementException e){
            this.userService.updateUsername(user, username);
            return ResponseEntity.ok("Update successful");
        }
    }

    @PutMapping("/updatePassword/{username}")
    public ResponseEntity<String> updatePassword(@RequestBody User user, @PathVariable String username){
        this.userService.updatePassword(user, username);

        return ResponseEntity.ok("Update successful");
    }
}
