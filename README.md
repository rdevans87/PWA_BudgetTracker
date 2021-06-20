# PWA_BudgetTracker

## Summary

Unit 18 PWA Homework: Online/Offline Budget Trackers:

Budget Tracker is a `Progressive Web Application` that provides added functionality for offline access.  The user is able to add expenses and deposits to their budget with or without a connection. 

When entering transactions offline, they populate the total when brought back online. In addition, `indexedDB` was used to cache dynamic content, i.e. users' inputs for withdrawals or deposits.

Application deplyed with `Heroku and MongoDB Atlas.`:


## Table of Contents
* [User Story](#user-story)
* [Business Context](#business-context)
* [Mock Up](#mock-up)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Acceptance #Citeria](#)
* [Resources](#resources)
* [Submitted For Review](#submitted-for-review)
* [Questions](#questions)
* [License](#license)

## User Story

```
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

```

## Business Context

Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.

## Installation


## Usage

For more information on deploying with MongoDB Atlas and Heroku, please visit the [resources](#resources) section.
# Features

Offline Functionality:

  * Enter deposits offline

  * Enter expenses offline

   When brought back online:

  * Offline entries are added to tracker.

## Acceptance Criteria

GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.

## Resources

[Progressive Web App](/)

[indexedDB](/)

[Heroku](https://www.heroku.com/) cloud-application platform

[MongoDB](https://www.mongodb.com/cloud/atlas/) NoSQL document database composed of field and value pairs.

[NodeJS](https://nodejs.org/en/) open-source, cross-platform, back-end JavaScript runtime environment.

[Deploy with Heroku and MongoDB Atlas](./assets/MongoAtlas-Deploy.md)

[Set Up MongoDB Atlas](./assets/MongoAtlas-Setup.md)

[indexedDB](/)

* [Why Performance Matters](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)

* [Measure Web Performance With The RAIL Model](https://developers.google.com/web/fundamentals/performance/rail)

* [Audit the Performance of Your Web Application](https://developers.google.com/web/fundamentals/performance/audit/)

* [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)

* [Your First Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)

## Submitted For Review

  * the URL to the deployed application

  * the URL to the Github repository




## Questions

[GitHub Profile](https://github.com/rdevans87)


## License

[MIT LICENSE](LICENSE)