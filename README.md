# Spring-Boot Bank #
This is Spring-Boot based bank application developed by Tomasz Wargala (UW Madison BS CS Student) in the summer of 2024. <br>
The backend applicaiton runs off a spring-boot server running on port 8080 that handles all REST API requests. <br>
The backend stores all data in a my-sql server ran on port 3306, using Docker (Docker must be running to run the backend server). <br>
The frontend of the project is run off Node.js on port 8000. <br>

## -- Run Instructions -- ##
Open Docker Desktop <br>
Ensure Node.js is installed <br>
Ensure Node.js http-server is installed <br>
_(if not, run "npm install -g http-server" in the terminal)_ <br>
Navigate to ".../BankServer/Backend" <br>
Run "./mvnw spring-boot:run" in the terminal <br>
Open a new terminal <br>
Navigate to ".../BankServer/Frontend" <br>
Run "npm run run" in the terminal <br>

## -- Use Instructions -- ##
Open a browser of choice <br>
Go to "http://localhost:8000" <br>
Explore!
