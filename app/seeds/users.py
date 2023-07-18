from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo", email="demo@aa.io", password="password", location="Azeroth"
    )
    marnie = User(
        username="marnie", email="marnie@aa.io", password="password", location="Skyrim"
    )
    bobbie = User(
        username="bobbie", email="bobbie@aa.io", password="password", location="Eorzea"
    )
    pia = User(
        username="Pia", email="pia@aa.io", password="password", location="Henesys"
    )
    misty = User(
        username="Misty", email="misty@aa.io", password="password", location="Cerulean City"
    )
    sylvanas = User(
        username="Sylvanas Windrunner", email="sylvanas@aa.io", password="password", location="Shadowlands"
    )
    link = User(
        username="Link", email="link@aa.io", password="password", location="Kokiri Forest"
    )
    tingle = User(
        username="Tingle", email="tingle@aa.io", password="password", location="Termina"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(pia)
    db.session.add(misty)
    db.session.add(sylvanas)
    db.session.add(link)
    db.session.add(tingle)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
