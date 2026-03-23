# NC News

Link to hosted version: https://nc-news-app-5h3i.onrender.com/api/

## Summary

This is an API that will access application data programatically. The intention to mimic a real world backend service, which should also provide this information to the Front End architecture

### Node and PSQL versions

The versions used in this application are

Node - v25.2.1

PSQL - 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

This can be checked using

```
node -v
psql --version
```

## Set-up

Once the repository has been cloned, in the terminal at the root of the directory, run the following to install the necessary dependencies to run the application

```
npm install
```


## Create .env files

To run this project, first you need to create the .env files for both test and development.

Create a new file called

```
.env.test
```

and inside that file add the following

```
PGDATABASE = nc_news_test
```

and another file called

```
.env.developemt
```

inside which you add the following

```
PGDATABASE = nc_news
```

## Seeding

To seed the databases locally, we first must create our databases

```
npm run setup-dbs
```

Once that has completed, to seed our databases, run the following

```
npm run seed
```

You can check the set up has been completed correctly by running the test suites

```
npm test
```
