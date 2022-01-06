# Backend Routes

## Items

- `GET /api/items`
  - Supports query paremeters to search for an item given the criteria.
  - `key` will be used to indicate the search criteria (`/api/items?key=Test`)
- `POST /api/items`
- `GET /api/items/:itemId`
  - Return all details and reviews
- `PUT /api/items/:itemId`
- `DELETE /api/items/:itemId`

## Reviews

- `POST /api/items/:itemId/reviews`
- `PUT /api/reviews/:reviewId`
- `DELETE /api/reviews/:reviewId`

## Cart

- `GET /api/cart`
  - Gets all the items in the cart
- `POST /api/cart`
  - Adds a new item to the cart
- `PATCH /api/cart/:itemId`
  - Updates the quantity of an item in the cart
- `DELETE /api/cart/:itemId`
