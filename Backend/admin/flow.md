Make all folder structure

## Install packages:
```
1. axios : to create network request like get,post
2. react-toastify: to create notification
3. react-router-dom: 

```

### create files in component & mount in app.jsx

main.jsx:

1. remove strictmode & add browserRouter & wrap app inside it.

2. create & style navbar & sidebar.

## Pages:

1. create 3 pages: To add ,display prduct list & orders

2. mount all pages in app.jsx using routes & route

3. change sidebar.jsx div to navlink & set to=/{pages} ex:-add/list/orders.

4. coz of navlinks when we click on sidebar icons "active" class is added automatically. We will use it to add color on it.


## add.jsx
1. create a form & style them.
2. style flex-col in index.css
3. To upload img create useState variable.

4. to preview img use terniary operator with the img name inside img tag. If img is there then createObjectURL else upload icon.

5. To store all details from form create a useState var with object(all input enter by user)

6. create a changinghandler function to handle all changes with the name. & add on every field

7. create useeffect & console data to check it is working or not.

8. add onsubmit on form & handleSubmit fun to handle data

9. after adding data & click on add page is reloaded to prevent this

10. Inside onSubmitHandler fun create formData & append all inputs into formData

11. Then pass this data to backend server using axios package & use if else to check data is added or not.

12. When data is send to server for notification we use toastify.
```
1. Go to toastify react website & copy header & paste in app.jsx
2. Then in add.jsx inside onSubmithandler after setImage add
3. toast.success(response.data.message –––)
4. for error add inside else toast.error(same –––)

```


## List.jsx

1. Store all data from db into a state variable. 

2. create a fun fetchList inside it:

    a. create a variable response with url using axios post method

    b. use if else if data is successfully added set data into setList usestate variblae else use toast to show error

3. create useEffect & call fetchList() inside it & check in the console.

## 4. To display these item on List page:

1. write html after adding all items header 
2. map from list & add return fooditem details (name,img,price,desc...)
3. style all 
4. for cursor (cross) add css in index.css file

5. to remove food from list when click on cross icon create a function & pass foodId & using axios post method delete that item & again fetchList to display foodList.

6. add toast notification for deletion of item

#### we have added url in list & add.jsx . remove these url & define in App.jsx


## Orders.jsx
1. create a useState vvar orders to get orderList from backend.

2. create a fun to fetch orderList from url & if data is successfully loaded setOrders to that data else throw a toast error. 

3. use useEffect & call fun.

4. create uI to display all orders
5. style all 

6. create api to update status - backend

7. create async fun to handle status change. & apply it on select onchange.

8. test everything & done 🙌👍(❁´◡`❁)(❁´◡`❁)


<!-- Deployment Issue -->
When you visit /list directly or refresh the page, Vercel tries to find a file called list — but it's a React SPA, so all routes must go through index.html.
 