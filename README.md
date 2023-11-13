# PROJECT #3 Calorie Counter-app-fullStack (MERN Stack + Auth)

## PROJECT OVERVIEW
The Overview of this project was to create an app which can calculate calories per meal per day. User is able to signup and create a profile and save foods per meal for any days. This app will calculate total amount of calories user consume each day based on chosen meal and number of serving sizes. The main goal of this app is to help user to be able to control amount of calories consume every day and then by having that figure, user is able to choose foods with lower calories and fat in order to lose weight, tone up, get healthy, change the habits, or start a new diet.

* **Scope -** AIM: The aim of the project is to build a simple app to count food calories for the user.
* **Features -** : user is able to search by name, able to see food details before adding it in to the meal, see full view of existing plans in a calendar.
* **Implementation Period-**: 2 Weeks
## TECHNOLOGIES & RESOURCES USED
* React
* Node.js - express
* Mongoose db
* JWT (JSON Web Token)
* Material-UI
* Moment.js
* React-big-calendar
* React Bootstrap
## CORE REQUIREMENTS
The Core requirements set out for this project where the following:
* **Models.** A minimum of 3 models with appropriate associations.
* **Views.** Use partial views to avoid DRY practices.
* **Handles invalid data.** Appropriate form handlers to validate data or notify users of invalid data.
* **User Login.** Basic User Authentication.
## OVERALL LAYOUT
### Signup/ Login Page
User is able to create a username & password to be used for login.
### Home page
User is able to search food without login and see available foods and description of the food. This is the only page visible to user without logging.
### Food Diary (logged in user)
This page shows details of chosen foods per meal by choosing date and also show total calories per meal.
User also is able to add foods to the current meal from this page.
### Weight History (logged in user)
this part is not available at the moment but the intension of this page was to show a weight history of user in a chart.
### Diet Calendar (logged in user)
this page gives a big picture of the days user already made a plan and which other days are empty.
## CHALLENGE ADD-ONS (Achieved)
* Convert frontend date format to match mongoDB format by using moment.js and couple of other tricks.
* Delete individual food from dayPlan meal in backend which still hasn't been solved as the data structure in backend is quite complex.
* Split food description to be able to do calculation on numbers. Whole food description comes as a string from external API.
* Learned how to use Promise.all to show my food Diary table. I needed couple of data to load the table and data was getting available at different time in a loop, using Promise.all solved my problem.
## FURTHER IMPROVEMENTS
* Add total calories per day in Food dairy.
* If user add new food to the meal for the existing date, is not visible straightaway.
* Add meal in Food Diary open a pop up which includes all meals but further improvement would be when user click on a specific meal pop up  just shows serving size of chosen meal (e.g. breakfast, lunch...) not all meals.  
* Add weight chart in weight history page to show weight loose trend- I also need to make a profile for user then user is able to update the weight in different times.
* Give capability to user to go to day plan details by clicking on day plan in a big calendar.
* Change data structure in backends to be able to delete individual food from each meal.