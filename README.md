# finalproject

# PROJECT STRUCTURE

This project is seperated into `server/` and `client/` code bases with the `src/` folder.

Within the `server/`, you will find folders for database connection and utils (`db/`), controllers for logic (`controllers/`), functions for express middlewars (`middlewares/`), functions for controllers (`functions/`), server routes (`routes/`), configuration (`config/`) and templates that will allow for easy testing through Postman (`testing templates/`).

Controllers and routes and testing templates are named accordingly. For example, the controllers with the create.account.controllers.js file are specifically curated for the create.account.routes.js file routes. And using the create.account.txt will help with testing these specific controllers and routes.

Within `client/`, you will find the `App.jsx` to start, along with other folders for frontend organization.
