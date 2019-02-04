### SMS Management App

### Description
SMS management application API is a simple app to manage short message service where Users can send and receive messages


### API ENDPOINT
| Endpoint | HTTP Method |	Description |
|----------|-------------|--------------|
|/api/v1/contact| POST |  Create a new contact |
|/api/v1/message | POST | Send messages |
|/api/v1/contact?contact=phoneNumber | GET | Get contact from list|
|/api/v1/message?sender=messageId| GET | view message sent |
|/api/v1/message?receiver=messageId| GET | view message received |
|/api/v1/contacts/:phoneNumber| DEL | Delete contact |
| /api/v1/message/:messageId/contacts/:contactId/DEL/ Delete masage by id

### API Documentation
[API Documentation](https://documenter.getpostman.com/view/4905727/RztoKSgD)


### Technologies
The src directory houses the implementation using
Node
Express
MongoDb

### Get Started
* Clone this repository from a terminal git clone https://github.com/ibrahim013/sms-manager.git

* cd into the project directory

* install project dependencies yarn

* Create .env file and set up the environment variables in .env-sample

* and run yarn start to run the application

Go to http://localhost:8000/
