package dev.tomasz.bank.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Data
@Table(name = "customers")
public class User {
        @Id @Column(name = "id") @NotNull @GeneratedValue
        Integer id;
        @Column(name = "customerName") @NotNull
        String customer_name;
        @Column(name = "username", unique = true) @NotNull
        String username;
        @Column(name = "password") @NotNull
        String password;
        @Column(name = "balance") @NotNull
        Double balance;
}
