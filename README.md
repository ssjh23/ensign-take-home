# Ensign-take-home
Take home assignment for Ensign Infosecurity Full stack web development

## Assignment 1
Step 1: Change to `Assignment1` as the root directory <br><br>
Step 2: Open `main.html` in the browser

## Assignment 2
Step 1: Change to `Assignment2/ensign-assignment` as the <br><br>
Step 2: run the following command
```
npm install
```
Step 3: run the server using
```
npm run dev
```

### Assignment 2 Routes
`{baseUrl}/:userid`: base url for the project. When the project first starts, add anything to replace `/:id` to load the main page
`{baseUrl}/:userid/product/:itemid`: Product detail route. Accessed when the user clicks on any product card
`{baseUrl/:userid/checkout`: Checkout route. Accessed when the user clicks the shopping cart icon on the top right.

### Data Persistence
Change the user id to show that each user has access to only their own shopping cart. The browser can also be closed and opened and the shopping cart will be maintained.
