# Self Monitoring App
A web app for self monitoring created as a final project for a course in Web Software Development at Aalto University. The app is deployed on Heroku and can be found [HERE](https://self-monitoring.herokuapp.com/).
### Usage
- __Clone__ the repo and navigate to the root of the folder
- To add your __database credentials__: add a `.env` file with your credentials
- To __run__: `deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js`
- To run in test mode: `deno test --allow-env --allow-read --allow-net`
---


### Project requirements:
- __Application structure__: logical folders, dependencies exported from deps.js, project launched from app.js, configs in separate folder
- __Users__: users stored in database, password hashed, emails must be unique, validation on server and errors shown on page
- __Authentication__: session-based authentication, login and logout functionality, security
- __Middleware__: the app needs to have middleware that logs all requests, all errors, and access within the app
- __Reporting__: separate reporting for morning and evening. Reporting homepage shows whether reporting for the day has already been done. Form dates are populated by default to today. Reporting is user specific.
- __Summarization__: weekly average and monthly average, selector for changing week and month. Averages calculated within database.
- __Landing page__ (root of app): brief description of application, all users' average mood, links to register and login.
- __Testing__: at least 20 meaningful automated tests.
- __Security__: field types in database are accurate, no possibilities for SQL injections, data from database is sanitized, users cannot access data of other users.
- __Database__: expensive calculations done in database, database uses a connection pool, indices are used when joining tables, database credentials are not included in code.
- __User interface / views__: stored in separate folder, recurring parts are separated into own partials, coherent style over different pages in the app, user sees if logged in (Logged in as xxx).
- __APIs__: the app provides an API endpoint for retrieving summary data for all users in a JSON format. It allows for cross-origin requests. 
- __Deployment__: application is deployed at an online location (Heroku) and can be run locally following the documentation provided.
- __Documentation__: contains necessary SQL statements to create the database, contains guidelines for running the application and running the tests.

