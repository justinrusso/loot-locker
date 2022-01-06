# Feature List

## User Accounts

- Demo login and user authentication.
- Users can browse the site without being authenticated, but some actions will be restricted.

## Items

- A user can add new products they want to sell.
- The owner of a product can edit the product they have posted.
- The owner of a product can delete a product they have posted.

- Users can view many items for sale on Loot Locker, or view ones posted specifically from a user.
- Items will appear as "out of stock" when the quantity remaining is 0.

## Reviews

- Reviews will be displayed on each products' page.
- A user can add review to a product containing a comment and 1-5 star reviews.
- A user can update their review.
- A user can delete their review.

## Shopping Cart

A shopping cart will persist between sessions.

- A user can see all items in their shopping cart.
- A user can add items to their shopping cart.
- A user can adjust the quantity of items in their cart.
- A user can remove items from their cart.

When the shopping cart is checked out, the quantity of all items in the shopping cart will decrease by the amount of each item purchased.

## Search

A user can search for products by name. The search will be case insensitive and search for parts of the string.

## Websocket (Bonus)

- When an Item is added to the shopping cart, it will update other user's pages to show how many users currently have the item in cart.
- When an Item is purchased, the quantity will update to the user and will display as "low in stock" or "out of stock" where appropriate.
- When a review is added, updated, or deleted, the review will be displayed immediately to the user and update the overall rating.

## Categories (Bonus)

- Categories can be used to organize items into related sections.
- Categories can be searched as well as being added to the navigation.
- Categories will be pre-defined in the database
- On the item's page the seller can add categories

## Orders (Bonus)

- Once an order is played, the items in the shopping cart will be converted into an order
- Users can look at every order placed
- The order's page will list each item, the total cost, and the cost of each item at the time of purchase
- Items will not be actually deleted - rather they will be marked as "deleted" and omitted from queries.
- These deleted items can be used to get the name and description of the item.
