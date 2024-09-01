CREATE TABLE IF NOT EXISTS customers (
    'id' INT NOT NULL AUTO_INCREMENT,
    'customer_name' varchar(250) NOT NULL,
    'username' varchar(250) NOT NULL UNIQUE,
    'password' varchar(250) NOT NULL,
    'balance' double NOT NULL,
    PRIMARY KEY (id)
);