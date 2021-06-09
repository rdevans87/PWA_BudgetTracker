# PWA_BudgetTracker


Unit 18 PWA Homework: Online/Offline Budget Trackers

Budget Tracker is a `Progressive Web Application` that provides added functionality for offline access.  The user is able to add expenses and deposits to their budget with or without a connection. 

When entering transactions offline, they populate the total when brought back online. In addition, `indexedDB` was used to cache dynamic content, i.e. users' inputs for withdrawals or deposits.

Application deplyed with `Heroku and MongoDB Atlas.`:

[PWA_BudgetTracker](/)

Offline Functionality:

  * Enter deposits offline

  * Enter expenses offline

When brought back online:

  * Offline entries are added to tracker.

## User Story
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Business Context

Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.


## Acceptance Criteria
GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.

- - -

## Submission on BCS

* You are required to submit the following:

  * the URL to the deployed application

  * the URL to the Github repository

- - -

## Hint

* In order to cache dynamic content, i.e. users' inputs for withdrawals or deposits, incorporate `indexedDB` from the previous module.

* Use [Google](https://www.google.com) or another search engine to research this topic.