from app.models import db, Item


# Adds a demo user, you can add other users here if you want
def seed_items():
    heart_container = Item(
      user_id=1,
      name="Heart Container | +1 Heart",
      description=
      """
      Heart Containers, also known as Container Hearts, are recurring items in the Legend of Zelda series. These heart-shaped containers are visual representations of Link's current health. The more Heart Containers Link collects, the more health he will have. The number of Heart Containers Link has reflects the maximum amount of health he can have at one time, traditionally displayed in the upper left corner of the screen. When Link's health is full, the Heart Containers are red. As Link loses health, they lose their color or disappear. In some games, Link can lose quarter hearts or half hearts.
      Link usually starts his adventure with three Heart Containers; the limit for how many Heart Containers Link can obtain in all depends on the game, though the most common maximum is twenty. Heart Containers are typically left behind by bosses upon defeat. Link can also "create" Heart Containers by collecting Pieces of Heart; the most common number of Pieces of Heart needed to complete another Heart Container is four, however, exceptions exist. Some games omit Pieces of Heart in favor of completed Heart Containers. Occasionally, Link will need a specific number of Heart Containers to complete certain tasks.
      """,
      image="https://purenintendo.com/wp-content/uploads/2012/03/LOZ_OoT_3D_HeartPiece.png",
      price=500,
      stock=5
    )

    db.session.add(heart_container)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute("TRUNCATE items RESTART IDENTITY CASCADE;")
    db.session.commit()
