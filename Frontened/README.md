## project setup

```
npm create vite@latest
npm i
npm i react-router-dom
npm run dev.
```

## App.jsx
1. take app class of App.jsx in index.css & change width:80% & margin:auto.

## Navbar Components
1. add html for navbar
2. get outfit font from google font & add in index.css
3. style navbar items

4. for a line below nnavbar item like- home,contact  :   using useState in li
5. style dot class so that we can display item in cart
6. Style & done. ⚡👍🔶🌟

## Then created 3 pages : home,cart & placeOrder.

## Set routes for different pages:
1. go to main.jsx & remove restricted.
2. wrap app into browserRouter.
3. then go to app.jsx & set routes

## Header component
1. create a header component & mount it on home page.
2. copy header img from assets & paste in public.
3. write html for header & style them
4. for fade effect in header create keyframes in index.css & add animation in header-contents with 3s.
5. done  ⚡👍🔶🌟

## Menu component
1. create explore menu component & mount it onhome page.
2. add html
3. get data by mapping menu-list in menu component & add hr outside 
4. style everything. 

5. create useState in home & setting category by passing as a prop in explore menu form home. initila value is 'All'

6. passing category & setCategory as prop in explore menu & applying onclick on menu items & checking if prev=item.menu_name then set it to All else set item.menu_name

7. add an active classname to img when category===item.menu_name else pass empty string ""

8. style & done......


## Context
```
Context, in React, is a way to pass data down through a component tree without having to pass props down through every level. 
```

1. after menu create a new folder in src and a new file StoreContext
2. export & create a new StoreContextProvider, return & export it.
3. use it in main.jsx
4. import food_list form assets & add inside this function StCPro. 

```
we are doing this so that we don't need to import food item everywhere & then use. Instead with the help of context we can use food list everywhere.
```

## Food Display

1. create a new component & export food_list using useContext in it.
2. mount foodDisplay in home.jsx with a prop category=category.
3. create a new component FoodItem to display in foodDisplay return statement.
4. mount FoodItem inside return of food-display-list of foodDisplay with all props value.
5. add styles in food display items like h2, lists


## FoodItem
1. In this component pass props: id, name,price,description,image
2. add all details passed as prop with html
3. after styling food display style food items.

4. Now we want to add a button so that we can add item in cart
5. so create a state variable 'setItemCount' & add after food-item--img inside container.
6. style all 


# Using one single state variable we are managing 36 product. which can create errors, not a good practice.

## Solution: manageCart data


1. go to storeContext & create  useState variable 'cartItem' initilize with {}

2. addtocart function
3. removecart function

4. export it in contextValue.
5. get this data in foodItem using useContext.


### replace itemcount with cartitem & setItemCount(prev=>prev+1) -> add/removecart function with id.

1. go to store context & create useEffect to log cartitems in console.




## for filtering data according to category
1. go to foodDisplay & write return inside if(category==='All' || category===item.category)return.


## Footer component
1. add footer-left,center,right 3 sections & html then style them.

## App Download component
1. add h2 & 2 img & style them. 


## Responsiveness:
1. Make navbar responsive:
```
1. for max-width:1050px
1. for max-width:900px
1. for max-width:750px
```
2. Header 
3. Explore menu
4. Footer

## Link all the nav-links to each sections.

1. open navbar.jsx & change first li-> Link & add to='/'
2. change other li -> a & add href='#section'

3. To convert smooth scroll -> add scroll-behaviour: smooth in index.css


## Login & Signup component

1. create loginPopup component & add css with it.

2. open App.jsx & create a showLogin useState variable with initial value false.

3. inside fragment if showLogin?loginpopup component else empty fragment.

4. pass props in Navbar & then receive it in navbar.jsx.   =>  setShowLogin={setShowLogin}

5. add onclick on button & change showLogin state to true.


## LoginPopup component

1. create useState variable initial value = sign up & add in h2

2. pass setShowLogin as prop in LoginPopup in app.jsx where we mount it.

3. add img after h2 & onclick setShowLogin:false.  So that when we click on cross icon login form will be closed.

4. create inputs & buttons & if currState==Login then <></> else name input field .

5. create 2 para if user not have account then create account else login.  We will check currState==Login then new account pare else login para.

6. style & done


## Add to Cart page Design

1. create usecontext var & take all the variable from StoreContext

2. to add /cart in the cart icon:   wrap addToCart img in navbar inside a Link & to='/cart'

3. To go from cart page to / :   wrap logo img in a Link & add to='/'

4. write html for this page & style them

5. to delete item from card add removeFromCart on cross .

6. style everything

7. For total & subtotal:
```
1. go to storecontext & create a function
2. if that item >0 then 
3. calculate total amount = price * qty
return total amount
```

8. The dot icon on cart icon will only shown when there is some item in cart:

```
1. open navbar.jsx & useContext->getTotalCartAmount
2. In div add class virtually by checking if gtca===0?"":'dot'
```

## PLace order page:

1. create form & 2div for left & right
2. In cart.jsx proceed button onClick={()=>navigate('/order')}
3. write html for left & in right copy paste cart-total.

