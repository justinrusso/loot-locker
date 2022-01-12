from app.models import db, Review


def seed_reviews():
    first = Review(
        user_id=1,
        item_id=1,
        rating=5,
        comment="Beautiful. Worth every second of effort to obtain.",
        created_at="Sat, 08 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:24:00 GMT",
    )

    second = Review(
        user_id=2,
        item_id=1,
        rating=3,
        comment="When does SMN get Alexander? Please Yoshi-P.",
        created_at="Sat, 08 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:26:00 GMT",
    )

    third = Review(
        user_id=3,
        item_id=1,
        rating=4,
        created_at="Sat, 08 Jan 2022 19:28:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:28:00 GMT",
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)

    db.session.commit()


def undo_reviews():
    db.session.execute("TRUNCATE reviews RESTART IDENTITY CASCADE;")
    db.session.commit()
