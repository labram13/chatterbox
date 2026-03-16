# Chatter-Box

## Description
A full-stack chat chat application with a goal of sending messages to individuals or groups of people with the ability to create separate chatrooms. The goal of this project is to apply knowledge of **websockets** for instant communication and notifications. **Caching** will also be implemented for faster message load times. **Cloud file storage** will be included so users will be able to send different types of media mostly aimed at images. 

## Technical Description


### Tech Stack
- React
- Express
- PostgreSQL
- AWS (File Storage)
- Redis (Caching)
- JWT (Token authentication)
- Bcrypt (Password Hashing)
- Socket.io (websockets)

### User Stories

| Priority | User | Description | Technical Implementation |
|----------|------|-------------|-------------------------|
| P0 | As a user, I want to be able to register a  new account and login with my credentials. |Register new user into SQL database. Confirm login credentials by accessing SQL DB| Save new user into SQL Database. Check user credentials within DB to confirm login.|
| P0 | As a user, I want to have my sessions secured when using the app. | Authenticate the user's session.  | Send JWT tokens to user's cookie.|
|P0|As a user, I want to be able to send direct messages to people and have them read instantly|Send messages to other users.|Use Socket.io to connect others and send messages instantly. Messages will be saved in DB that will show the sender and recipient.|
|P1| As a user, I want notifications when I get a new message when not directly chatting with someone | Badge notifications for new messages | Use websockets to update badge count on number of new messages not seen with a specific user.
|P1| As a user, I want my messages to be loaded quickly especially with someone I've had many conversationsn with. | Load messages quickly | Use redis for caching for quicker message load times| 

