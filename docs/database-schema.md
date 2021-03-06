# Database Schema

![Database Schema](https://github.com/justinrusso/loot-locker/blob/main/docs/images/database-schema.jpg)

```
Table users {
  id int [pk, increment]
  username varchar [unique, not null]
  email varchar [unique, not null]
  hashed_password varchar [not null]
  location varchar [not null]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Table items {
  id int [pk, increment]
  user_id int [ref: > users.id]
  name varchar [not null]
  description varchar [not null]
  image varchar [not null]
  price int [not null] // * 100 or / 100
  stock int [not null]
  created_at datetime [default: `now()`, not null]
  updated_at datetime [default: `now()`, not null]

  Indexes {
    (name) [name: 'item_name']
  }
}

Table reviews {
  id int [pk, increment]
  user_id int [not null, ref: > users.id]
  item_id int [not null, ref: > items.id]
  rating int [not null]
  comment text [not null]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Table shopping_cart_items {
  user_id int [pk, not null, ref: > users.id]
  item_id int [pk, not null, ref: > items.id]
  quantity int [not null]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Table item_review_summary {
  item_id int [pk, not null, ref: > items.id]
  num_of_reviews int [not null]
  rating_total int [not null]
}

Table categories {
  id int [pk, increment]
  name varchar [not null]
}

Table categories_to_items {
  id int [pk, increment]
  item_id [not null, ref: > items.id]
  category_id [not null, ref: > category.id]
}
```
