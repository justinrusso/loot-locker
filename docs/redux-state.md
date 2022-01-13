# Redux State

```js
{
    // sorted on created_at
    shoppingCart: {
        4: {
            userId: 1,
            itemId: 4,
            quantity: 2,
            created_at: '',
            updated_at: ''
        }
    },
    session: {
        // current logged in user
        user: {
            id: 2,
            username: "A user",
            email: "user@user.io"
        }
    },
    items: {
        // Normalized objects from api responses
        entities: {
            items: {
                4: {
                    id: 4,
                    name: 'Some Item',
                    reviews: [1, 2],
                    seller: 1
                },
                5: {
                    id: 5,
                    name: 'Some Other Item',
                    reviews: [],
                    seller: 2
                },
            },
            reviews: {
                1: {
                    id: 1,
                    rating: 2,
                    comment: "meh"
                },
                2: {
                    id: 2,
                    rating: 1,
                    comment: "not good"
                }
            },
            sellers: {
                1: {
                    id: 1,
                    username: "some seller",
                    location: "somewhere"
                }
            },
            new: [5],
            picks: [5],
        }
    },
    categories: {
        1: {
            id: 1,
            name: 'some category',
        }
    }
}
```
