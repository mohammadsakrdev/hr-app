# Description

HR web application, that maintain the following functionalities login module, as we have two users’ types, employee and HR assistant. Employees could edit and save their data, they also can search for company benefits like offers, new medical benefits, other news, and so on. HR assistance user is responsible for all employees CRUD operations. Note that each employee has a manager and only one manager, also which department this employee works for. HR Assistant is responsible for adding, editing and deleting benefits.

# Installing

1- Download the repository git clone https://github.com/mohammadsakrdev/hr-app.git
2- Open the Terminal (Linux & MacOS) or PowerShell (Windows) and change directory to the project folder.
3- Type ‘npm install’ in the Terminal (PowerShell) and press Enter. All the dependencies would be installed.
4- Go back to the Terminal (PowerShell) and be sure that you are pointing inside the project folder. To open the application, type 'npm run start-dev' and press Enter.
5- The application should be live on the local port 3002.
6- Type http://localhost:3002/ into a browser.
7- To login use the username: hr and the password: 123456
8- Now you should be inside the application

# Run with Docker

How to use this image

1- docker build -t hr-backend-docker-image .
2- docker run -p 3002:3002 hr-backend-docker-image
