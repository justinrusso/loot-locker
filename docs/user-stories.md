# User Stories

## Login & Sign Up

As an unauthenticated user, I want to be able to register for an account so I can purchase products.

- In the navbar, a link directs the user to the login page to enter their credentials
- In the navbar, a link directs the user to the sign up page to sign up for the website if they do not have an account.
- A demo link on the login page will log the user in as the demo user to experience the site without registering.

As an authenticated user, I want to be able to log out of my account.

- A log out button appears in a dropdown in a profile button in the navbar.

## Items

As a user, I want to browse all items sold by registered users of the website.

- An items page displays all items for sale
- A user page that displays all items for sale from the user

As a seller, I want to sell items to earn money.

- A "Sell new Item" button appears in a dropdown in a profile button in the navbar

As a seller, I want to update the details and remaining stock of my items so buyers can have up to date information on the item they are purchasing.

- An edit button appears on the item's page if the authenticated user is the seller.
- The edit button directs the user to a page displaying form fields to update the items details.

As a seller, I want to delete the item posting from Loot Locker so buyers can not purchase an item that no longer exists.

- A "Delete Item" button appears in a similar location to where the "Add to Cart" button would be.
- A confirmation modal appears to confirm the deletion.

## Reviews

As a user, I want to view reviews for items on the website so I know the items I am buying are of good quality.

- The average rating of the item is under each item in listings
- The average rating is displayed on the item's page
- Reviews are displayed under the item's details on the item's page.
- The review item displays the rating given by the user as well as their comment.

As an authenticated user, I want to leave a review on the website so users know my experiences with the product.

- Unfilled rating stars appear just before the reviews for the product prompting the user to leave a review.
- When a star is clicked, a textarea appears to allow the user to leave a comment.
- A "Post Comment" button appears allowing the user to submit their review.
- This feature is not functional if the seller of the item is the current user.

As an authenticated user, I want to edit my review I left for an item so I can fix errors or update my review when the seller resolves issues.

- An edit icon appears next to the comment the user left.
- When the button is clicked, a modal appears with the rating stars and textarea pre-filled allowing the user to update their review.

As an authenticated user, I want to delete my review so it no longer appears no the item's page.

- A delete icon appears next to the comment the user left.
- When the button is clicked, a modal appears confirming the deletion of the review.

## Shopping Cart

As an authenticated user, I want to add items to a shopping cart so I can check out multiple items at once instead purchasing each individually.

- A shopping cart icon appears in the navbar
- When clicked a drawer appears from the side showing the items added to the shopping cart

As an authenticated user, I want to add items to my cart so I can check out and purchase them all at once.

- An "Add to Cart" button is displayed to add the item to their shopping cart that displays only if the user is not the seller.
- The "Add to Cart" button directs the user to log in if there is no authenticated user
- The "Add to Cart" button is disabled when the product is out of stock & reads "Out of Stock" instead.

As an authenticated user, I want to adjust the quantity of the items in my cart so I can add more to my shopping cart without navigating to the items page.

- A quantity dropdown appears along with the item with numbers from 1 to 10

As an authenticated user, I want to remove items from the cart so I don't have to purchase them if I change my mind.

- A delete button appears along with the item to remove the item from the cart.

As an authenticated user, I want to purchase items so that I can enjoy my new product.

- A "Checkout" button is added to allow the user to purchase all the items in their cart.
- The cart empties once the button is clicked
- The stock remaining of all the items purchased are reduces by the quantity purchased by the user.
- If the amount of stock remaining is less than the quantity remaining, an error appears instead.

## Search

As a user, I want to search for products on the website so I can find what I want more easily.

- A search bar appears in the navbar
- When the search is performed, the user is directed to the items list page displays all results that matched the search criteria.
