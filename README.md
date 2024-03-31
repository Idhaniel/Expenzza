# EXPENZZA API DOCUMENTATION
    Welcome to the Expenzza API documentation! Expensza is a simple expense tracker designed to help you manage your finances effortlessly. This API provides basic CRUD (Create, Read, Update, Delete) functionalities for managing expenses, categories, and users 


## Setup
1. Install all dependencies by using your preferred package installer. 
   Using npm:

```shell 
    npm install
```

2. Create a .env file in the project root and in it three variables:
    + PORT = PORTNUMBER  _//**Optional**. By default would be set to port 5000_
    + MONGO_URI = CONNECTIONSTRING//**Required** _Set to a mongoDb connection string._ To learn how to get a mongodb connection string. Please visit the [MongoDB Docs](https://www.mongodb.com/docs/guides/atlas/connection-string/)
    + JWT_SECRET_PHRASE = SECRETPHASE _//**Required** _Set to a random phrase_

3. Open a shell terminal to and run the following script to
    ```sh
    npm start
    ```
    This sets up a connection to your database if a MONGO_URI was specified correctly in the .env file and spins up a local server at the port specified in the .env file(5000 if none specified).
    Your server should be running and can be accessed from your browser at localhost:PORT||4000/

## Request Payloads And Responses
### Error responses
Error responses are objects with two properties
 ```js

 {success: false, msg:["Some error message"]}

 ```

The _success_ flag is always set to false by default for errors
The _msg_ property is an array containing user-friendly errors.

### Successful responses
Successful responses have different response syntaxes depending on the route being accessed.
**Auth Routes (/api/v1/auth)**

##### Auth Routes only accepts post requests
###### Endpoints
 * _/login_: Requires a username and password from the request payload and Returns if successful, a response with an object with a success flag set to true, a user object with name and id property set to that of the user logging in and a token. 
 ```javascript

 //Request Payload
 {"username": "UserName", "password":"Password"}

 //Response 
 {success: true, user: {name: user.name, id: user.id}, token}

 ```

 * _/register_: Requires a username and password from the request payload and Returns if successful, a response with an object with a success flag set to true, a user object with name and id property set to that of the user logging in and a token.
  ```javascript

  //Request Payload
  {"username" : "UserName", "password": "Password"}

  //Response 
  {success: true, user: {name: user.name, id: user.id}, token}

  ```

**Expenses Routes (/api/v1/expenses)**

###### Only Authenicated Users can access this endpoint. Expenses Routes supports multiple CRUD operations
##### Endpoints
#### (/)

+ GET : If successful, Returns a response with an object containing the success flag set to true, an array of expenses object, and a count property that shows the number of items retrieved.
```js

//Response 
{success: true, expenses, count: expenses.length}

```

+ POST : Requires an amount, a description and optional category field from the request payload and Returns if successful, a response with an object containing only a success flag set to true.
```js

//Request Payload
{amount: 50, description: "Project Setup", category : "Education"}

//Response
{success: true}

```

#### (/:id)

+ GET : Requires a url parameter of _id_ from the request object and if successful, Returns a response with an object with success flag set to true and the expense with the id provided
```js

{success: true, expense }

```

---


