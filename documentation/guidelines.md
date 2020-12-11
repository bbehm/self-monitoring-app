# Self Monitoring App

A demo of my project can be found here: [Demo on Heroku](https://self-monitoring.herokuapp.com/).

### Set up and usage locally

- The SQL commands needed to create the database schema can be found in the `documentation/database.sql` file.
- You need to __add your own database credentials__: create a file called `.env` at the root of the repository where you add your own database credentials. Example below:

```
hostname=db-hostname
database=db-name
user=username
port=5432
```

Now navigate to the root of the repo and __run the app__:
`deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js`

The application will by default be running on port 7777 - so http://localhost:7777/. You can also give your preferred port through the command line when running the app. If you for example want the app to run on 7776:

`deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js 7776`

Press `ctr + c` to stop the app.

### Running tests

To run the tests locally, navigate to the root of the folder an run:

`deno test --allow-env --allow-net --allow-read --unstable`

Press `ctrl + c` to exit once the tests have run.

### Additional comments about the app

__Reporting and Summary__

My app requires both morning and evening reports to be done in order to show the summary statistics correctly. In other words, if only for example morning data is given, the summary will return empty fields for the evening data.

The default values for the summary view is the last completed month and week. Also, when the week is changed, the month view will update accordingly. 

__API__

If you ask for a date with only morning or only evening reports the API endpoint at `/api/summary/:year/:month/:day` will respond with *'No data found for the selected day'*. This since the incomplete data wouldn't allow for calculating a reliable average.