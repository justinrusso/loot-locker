from app.models import db, Review, ReviewSummary, environment, SCHEMA


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
        user_id=4,
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

    fourth = Review(
        user_id=1,
        item_id=2,
        rating=5,
        created_at="Sat, 08 Jan 2022 19:28:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:28:00 GMT",
    )

    ashes1 = Review(
        item_id=13,
        user_id=1,
        rating=5,
        comment="Beautiful.",
        created_at="Sat, 08 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 09 Jan 2022 19:24:00 GMT",
    )

    ashes2 = Review(
        item_id=13,
        user_id=4,
        rating=5,
        comment="I can't believe I have this mount. Amazing!",
        created_at="Sat, 10 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 10 Jan 2022 19:24:00 GMT",
    )

    heavenly_serpent1 = Review(
        item_id=14,
        user_id=3,
        rating=4,
        comment="Love the look of this mount! Seller was a bit slower than I had hoped.",
        created_at="Sat, 12 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 12 Jan 2022 19:24:00 GMT",
    )

    heavenly_serpent2 = Review(
        item_id=14,
        user_id=4,
        rating=5,
        comment="I can't believe I have this mount. Amazing!",
        created_at="Sat, 12 Jan 2022 23:24:00 GMT",
        updated_at="Sat, 12 Jan 2022 23:24:00 GMT",
    )

    heavenly_serpent3 = Review(
        item_id=14,
        user_id=1,
        rating=1,
        comment="I regret buying this. Definitely better mounts out there...",
        created_at="Sat, 14 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 14 Jan 2022 19:24:00 GMT",
    )

    kb_review = Review(
        user_id=3,
        item_id=7,
        rating=5,
        comment="Really great purchase.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    ma_review = Review(
        user_id=3,
        item_id=8,
        rating=2,
        comment="Upfront cost doesn't seem like much, but it's super expensive long-term.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    lotm_review = Review(
        user_id=3,
        item_id=9,
        rating=3,
        comment="Really beautiful mount, but mine ran away while I was sleeping.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    wr_review = Review(
        user_id=3,
        item_id=10,
        rating=5,
        comment="No idea what it does, but I think it's giving me a buff.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    mh_review = Review(
        user_id=3,
        item_id=11,
        rating=4,
        comment="Worked as expected.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    heart_container1 = Review(
        user_id=7,
        item_id=6,
        rating=5,
        comment="Would buy again, but Tingle will only sell me one. Guess I'll have to smash some rocks to find another",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    heart_container2 = Review(
        user_id=3,
        item_id=6,
        rating=5,
        comment="After buying this item, I feel like I could fight a full grown dodongo!",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    lapras1 = Review(
        user_id=3,
        item_id=12,
        rating=2,
        comment="Lapras won't obey me! She just ignores my commands and zooms around the beach with Psyduck on her back. Maybe I need more experience training Pokémon...",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    lapras2 = Review(
        user_id=2,
        item_id=12,
        rating=5,
        comment="Lapras is my best buddy! We've explored every shore of Kanto together.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    lapras3 = Review(
        user_id=3,
        item_id=12,
        rating=5,
        comment="I always wanted to visit Cinnabar Island, but I don't know how to swim. Lapras granted my wish by carrying me there on his back! What a bro.",
        created_at="Sat, 15 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 15 Jan 2022 19:26:00 GMT",
    )

    summary = ReviewSummary(
        item_id=1,
        num_of_reviews=3,
        ratings_total=12,
    )

    summaryTwo = ReviewSummary(
        item_id=2,
        num_of_reviews=1,
        ratings_total=5,
    )

    ashes_s = ReviewSummary(
        item_id=13,
        num_of_reviews=2,
        ratings_total=10,
    )

    heart_container_s = ReviewSummary(
        item_id=6,
        num_of_reviews=2,
        ratings_total=10,
    )

    lapras_s = ReviewSummary(
        item_id=12,
        num_of_reviews=3,
        ratings_total=12,
    )

    heavenly_serpent_s = ReviewSummary(
        item_id=14,
        num_of_reviews=3,
        ratings_total=10,
    )

    summary7 = ReviewSummary(
        item_id=7,
        num_of_reviews=1,
        ratings_total=5,
    )
    summary8 = ReviewSummary(
        item_id=8,
        num_of_reviews=1,
        ratings_total=2,
    )
    summary9 = ReviewSummary(
        item_id=9,
        num_of_reviews=1,
        ratings_total=3,
    )
    summary10 = ReviewSummary(
        item_id=10,
        num_of_reviews=1,
        ratings_total=5,
    )
    summary11 = ReviewSummary(
        item_id=11,
        num_of_reviews=1,
        ratings_total=4,
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(ashes1)
    db.session.add(ashes2)
    db.session.add(heavenly_serpent1)
    db.session.add(heavenly_serpent2)
    db.session.add(heavenly_serpent3)
    db.session.add(kb_review)
    db.session.add(ma_review)
    db.session.add(lotm_review)
    db.session.add(wr_review)
    db.session.add(mh_review)
    db.session.add(heart_container1)
    db.session.add(heart_container2)
    db.session.add(lapras1)
    db.session.add(lapras2)
    db.session.add(lapras3)

    db.session.add(summary)
    db.session.add(summaryTwo)
    db.session.add(ashes_s)
    db.session.add(heavenly_serpent_s)
    db.session.add(summary7)
    db.session.add(summary8)
    db.session.add(summary9)
    db.session.add(summary10)
    db.session.add(summary11)
    db.session.add(heart_container_s)
    db.session.add(lapras_s)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.review_summaries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
        db.session.execute(
            'TRUNCATE review_summaries RESTART IDENTITY CASCADE;')
    db.session.commit()
