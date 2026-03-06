# Backend Setup

### Install all dependencies:

```
1. express: 

2. mongoose: connect with database

3. jsonwebtoken: authentication system

4. bcrypt: encrypt users data & store in database. (hashing of pwd)

5. cors: permission to connect frontend with backend

6. dotenv: to use environment variable in project

7. body-parser: parse data coming from user

8. multer: to create img store system

9. stripe: for payment gateway

10. validator: for checking email/pwd is valid or not

```

### Folder Structure:

1. create folders: config, controllers, middleware, models, routes, uploads.
and a file .env to store environment var.

2. change type module in package.json



## Server.js

1. import express & cors
2. add app=express & port=4000

3. adding middleware:
    a. express.json():  request from frontened to backend will be parsed

    b. cors: access backend from any frontened

4. Instead of browser here we are using thunder client extension for testing. 




## Mongodb Atlas setup
1. go to website & do all setup : https://www.youtube.com/watch?v=DBMPXJJfQEA

```
1. sign in
2. create new project
3. go to database & create 
4. choose free plan & google cloud & proceed
5. Set username & password & "click on choose a connection method"
6. choose driver & then mongoose & copy given string & close
7. go to network access: then add IP: 0.0.0.0 & delete prev one. (we add new so that we can access from any IP)

```



## config Folder
1. create a db.js file & logic to connect with database will written here.

2. inside mongoose.connect paste url that we copied from mongodb atlas & replace question mark with food-Delivery

3. create a function & export it then use in server.js after middleware

4. Database will be connected with express app.


## Models Folder : To store product in db
1. create a file foodmodel.js
2. create food Schema & export it


## Controller Folder: To create api to add new food item in db
1. create food controller file & a fun addFood then export this function.


## routes folder 
1. create food route file & a express foodRouter

2. create a post req to send data on server & data will be processed then res will genereated.

....

### To store product data into db : foodController.js

1. create variable to store file name 

2. create new food function using schema of foodmodel 

3.  use try-catch block :
```
a. In try await food.save(): (food will be saved in db) & a response in json to display success message

b. if any occur occured then handle error & log them in console using catch. & also add a response to display error message.

```

## Testing
1. start server & open thunder extension
2. then post on http://localhost:4000/api/food/add by adding all item according to foodSchema.
3. open upload folder image will be there if successfully added.
4. then go to mongodb atlas -> database -> collections

## Fetch data from mongodb atlas to insert it in frontened.
1. create an endpoint app.use("/image", express.static('uploads'))
2. open browser & go to http://localhost:4000/image/{image file name}


### create ListFood api endpoint: to display all food items in db

1. Inside foodController.js
2. create a listFood function & add in export
3. open food router file & create a get request same as /add post router.

4. open foodController & write logic to get all food list & send response inside listFood function.

5. add try-catch block:
    a. inside try create a variable foods(await find {} from foodModel) & a response in json to display success message.
    b. if any occur occured then handle error & log them in console using catch. & also add a response to display error message.

### Testing
1. start server & open thunder extension
2. choose get & link=http://localhost:4000/api/food/list then click send
3. u will get a list of food items


## To remove fooditem from db

1. create a async function removeFood inside foodController & export it

2. import it inside foodRoute & create a post request '/remove' using removeFood 

3. use same try-catch block

    a. inside try get food from foodmodel using findById function & pass "req.body.id" inside it.

    b. to delete images from uploads use fs.unlink(`uploads/${food.image}`, ()=>{})

    c. to delete foods from db use await  foodModel & findByIdAndDelete fun & pass same  "id"

    d. add same json response 

4. catch block - same as we do above.

### Testing:
1. start server & open thunder extension
2. choose get & link=http://localhost:4000/api/food/remove then inside body pass a json:  {"id" : "668b891153aea3e40bdc077a" } 
3. u will see a success message & image will be also removed from uploads folder.


### create admin pannel 



# User Authentication: (login & register)

1. create userController.js file inside controller folder. (login & signup logic)

2. inside routes folder create userRoute.js (routes)

3. create new file usermodel inside modle folder.


### UserModel.js
1. import mongoose & create userSchema with object name, email, password,cartData. write (minimize:false) so that it can be created without any data.


2. write or logic if model is created then simply add otherwise create new.

3. export userModel default


### UserController.js
1. import userModel, jwt, bcrypt & validator

#### create registeruser async function

```
1. add an obj to store name, pws, email by requesting body.

2. use try-catch
    try:
    a. if user already exits: make var exists & await for data from userModel. & apply findOne({email}) if it return true return json response with success:false & a message:user already exists.

    b. validate email format using validator & check pws length

    c. hash pws using bcrypt.
    d. create newuser using userModel & save it in db using await newUser.save function.

```


1. create token using jwt & return jwt.sign({id},) & one salt using that our data will be encrypted.

2. open env file & create JWT_SECRET with a random string then impport 'dotenv/config' in server.js

3. test at api/user/register. then create login user token

 
####  create loginUser async function

1. export loginuser,registerUser.
2. get user email & password form body
3. take try-catch :
4. in try: find email & store in user variable. compare password with stored password using bcrypt.compare() method. If user not exists then return false. 
else return a token 
5. handle error in catch.



### UserRoute.js
1. import express, loginuser, registeruser

2. create userRouter= express.Router()
3. create a userRouter post method "/register

4. create another userRouter post method "/login

5. export default userRouter.

6. setup userRouter in server.js file.



### To save cart item in db: 
1. create a file cartController & import userModel in it. 
2. create addTocart, removeFromCart, getCart async fun.
3. create a cartRoute file & import these 3 fun then create post route with these 3 methods.

##### 4. when user will send data then we'll get a token to authenticate & decode that token for that 

1. create a auth middleware file & connect it to cartRoute all post methods

## Auth.js
1. import jsonwebtoken & create a authMiddleware

2. get token from req.headers
3. check if token not exists then return not authorized. & success false

4. use try-catch to decode
5. inside try:
```
1. decodetoken using jwt.verify method pass token & process.env.JWT_SECRET which was used to create token. we have also used id to create token
 2. compare userId with decodetoken id& call middleware (next())

 3. else inside catch log error & error message.
```


##### AddtoCart:
1. get userData from body using findById fun then get cartData & check if there is any then add 1 to it else create a new one


###### RemoveCart:
1. get userData & cartData then check if cartData >0 then decrease by one & update in userModel


###### getCart:
1. get userData & cartData then send res with success & cartData. in catch block send error.


Integrate these features with frontened.



# payment gateway:
1. create a new orderModel file & write schema for orders
2. create orderRoute using post method & use it in server.js

3. create orderController & import order model, user model & stripe. then export placeOrder fun.

4. create stripe secret key:
```
a. go to stripe website & create account then go to dashboard & copy secret key & paste in env file.
```
5. create a var stripe to use stripe secret key. 

PLACEORDER FUN:
```
1. use try-catch: 

inside try: create newOrder using orderModel & get all data from body then save newOrder.

2. using user id empty cartData after payment.

3. create line_item with price data like currency , quantity.

4. include delivery charges.
5. send res with session_url 
6. display error using catch block
```

## Integrate it with frontend

#### Payment / order verify:
1. create a async fun verifyOrder in orderController. & make route for it in orderRoute.
2. get orderId & success from body
3. use try-catch block 
4. if success=true then use orderModel update method & pass orderId with payment:true & a response
5. in catch show error.

## Integrate it with frontend

## userOrders:
1. create a async fun userOrders in orderController & use it in orderRoute using post method with authmiddleware & userOrders fun at /userOrders endpoint.

2. test it: it will not run coz i have not added stripe secret key(which i will get after making stripe account. for INR i have to request to stripe that's why i have not created yet.)


### Integrate it with frontend.


## list users for admin panel
1. go to orderController & create a async fun listOrder then make route using get method.


## api for updating order status
1. go to orderController & create a async fun listOrder then make route using post method.

2. Link this api with admin panel.



#### Creating dummy users to test:
name: Sakshi
email: sakshi@gmail.com
password: sakshi1234

<!-- stripe payment testing -->
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/30)
CVC: Any 3 digits (e.g., 123)

