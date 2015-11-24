# FYF

##Overview
*Find your Flock* idea was constructed with one goal in mind: Fast collaboration and communication. The primary goal is to connect people through common interests without the hassle of making an account. This application is perfect for gamers and team players alike who share common interests and want connect to a community of fellow competitors. FyF provides a resource for users lacking players for their party in an online video game. A user from the landing page can select the gaming category. This will bring up a menu of games for them to select from. After picking their desired game a user can create a chat room with a title such as “Looking for fifth to play X game”. Then other users can join this chat and information can be exchanged. Users who want to create chatrooms are invited to make an account, Anonymous users can post in the chatroom without an account, creating fast collaboration. Chatrooms that are inactive for 15 minutes are deleted, favoring fresh chatrooms for fast collaboration. FyF has a multitude of different categories, from games to sports to hobbies.
##How To Run
From the directory this file is saved in run

npm install all the modules that are required have been saved so this will install all required modules

then run node server.js

make sure to terminate the server from the command line before restarting.

##Libraries
mongoose - https://github.com/Automattic/mongoose, MongoDB object modeling designed to work in an asynchronous environment.

bootstrap - https://github.com/twbs/bootstrap, The most popular HTML,CSS,and Javascript framework for designing websites.

express - https://github.com/strongloop/express, Minimalist framework for developing web applications in node.

express-handlebars - https://github.com/wycats/handlebars.js/, handlebars engine for node.

body-Parser - https://github.com/expressjs/body-parser, node.js body parsing middleware

express-session - https://github.com/expressjs/session, simple session middleware for express

connect-flash - https://github.com/jaredhanson/connect-flash, flash message middleware for connect and express

cookie-parser - https://github.com/expressjs/cookie-parser, cookie parsing middleware for express

morgan -  https://github.com/expressjs/morgan, http request logger middleware for node.js

##Views
about view - An about page for FYF that explains what it does and why people should use it.

admin view - A page for administrators to handle functions on the website that a not available to normal users.

chat view - The chat view is loaded for each of the topics on the website. Users can create chats and talk in chats in this view.

FAQ view - A page with some frequently asked questions that Users may have when using FYF.

home view - This is the page on which users can select their general topic for discussion.

login view- The login page for FYF.

team view - Team view with some bios on the team and what each member will be contributing to the project.

profile view - View that shows the profile of the user such as account name and avatar.

##Statefulness
Our application uses sessions for user/admin account login and log out. We also use sessions for anonymous user login where a person can use the features of the website without an account.  After sign in, the user will be redirected a new home page with categories and will be able to browse through the website without ending the user's session. The user can log out and end their session by hitting the log out button at the bottom of the page. The file server.js contains the algorithm and code to maintain statefulness for our application.
https://github.com/CS326-Oriole/FYF/blob/master/server.js

##Persistence

FyF uses a database to store records of user accounts, anonymous users, and chat logs. FyF adds information to the user accounts schema when accounts are created through the sign up feature. These are savd permanently so a user can log in at any time even after the server needs to be restarted. The records of user accounts are also used for log in verification to make sure usernames and passwords match up. The user accounts records are also used for account creation to ensure usernames are unique. The anonymous users records is kept to continuously create new anonymous accounts when new anonymous users try to access the application. The anonymous user table is emptied when the server is restarted so that when it is restarted the incremental value used to create new usernames is reset and this way the anonymous user table will not have duplicate entries. The chat logs table keeps track of chats for populating the chat view with accurate chats and to provide users with logs of chats they have particpated in. This table also provides a way for admins to review chats that have been flagged as inappropriate or view users chats for users that have been flagged as disruptive.

Our model.js file ( located at this link https://github.com/CS326-Oriole/FYF/tree/master/lib ) creates the functions necessary for adding and looking up users, anonymous users, and chats. These functions are exported to be used in the rest of our application such as in the user-routes.js file (located at this link https://github.com/CS326-Oriole/FYF/tree/master/routes ).  



