# finalproject

## Available Scripts

In the project terminal, go to the `src/server/` folder
From here you can run:

### `npm start`

to start the development server

Instructions for starting development server client-side is in the client-side README.md file.

# PROJECT STRUCTURE

This project is seperated into `server/` and `client/` code bases with the `src/` folder.

Within the `server/`, you will find folders for database connection and utils (`db/`), controllers for logic (`controllers/`), functions for express middlewars (`middlewares/`), functions for controllers (`functions/`), server routes (`routes/`), configuration (`config/`) and templates that will allow for easy testing through Postman (`testing templates/`).

Controllers and routes and testing templates are named according to it's major usage. For example, the controllers with the create.account.controllers.js file are specifically curated for the create.account.routes.js file routes. And using the create.account.txt will help with testing these specific controllers and routes. The names should also be a give away for what the purpose and function is for.

Within `client/`, you will find the `App.jsx` to start, along with other folders for frontend organization. Components and Pages are seperated from each other and each component and page within my application has it's own folder.

There will be many css pages. I apologize in advance. As I've progress in this project, so has my design capabilities, so I have reworked the css in my code as best as I could, and will continue to rework the css in this project as I continue to develop it.

The best test username and passwords to use:

Erms - ermsGirl5
JAGGirl5 - JAG5Girl
GLee52 - gleeBoy52
HenJon - HJBoy52

There are a few components in my application that are not functioning. They are there for show.

These include:
Comments (for discussion posts and journal posts)
Memories Component
Upload Images
Links to Circle Members Profiles
