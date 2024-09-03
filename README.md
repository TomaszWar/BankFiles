This is Spring-Boot based bank application developed by Tomasz Wargala (UW Madison BS CS Student) in the summer of 2024.
The backend applicaiton runs off a spring-boot server running on port 8080 that handles all REST API requests,
The backend stores all data in a my-sql server ran on port 3306, using Docker (Docker myust be running to run the backend server).
The frontend of the project is run off Node.js on port 8000.

-- Run Instructions --
Open Docker Desktop
Ensure Node.js is installed
Ensure Node.js http-server is installed
  if not, run "npm install -g http-server" in the terminal
Navigate to ".../BankServer/Backend"
Run "./mvnw spring-boot:run" in the terminal
Open a new terminal
Navigate to ".../BankServer/Frontend"
Run "npm run run" in the terminal

-- Use Instructions --
Open a browser of choice
Go to "http://localhost:8000"
Explore!
