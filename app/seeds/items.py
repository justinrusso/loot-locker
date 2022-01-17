from app.models import db, Item


# Adds a demo user, you can add other users here if you want
def seed_items():

    heart_container = Item(
        user_id=1,
        category_id=5,
        name="Heart Container | +1 Heart",
        description="""
        Heart Containers, also known as Container Hearts, are recurring items in the Legend of Zelda series. These heart-shaped containers are visual representations of Link's current health. The more Heart Containers Link collects, the more health he will have. The number of Heart Containers Link has reflects the maximum amount of health he can have at one time, traditionally displayed in the upper left corner of the screen. When Link's health is full, the Heart Containers are red. As Link loses health, they lose their color or disappear. In some games, Link can lose quarter hearts or half hearts.
        Link usually starts his adventure with three Heart Containers; the limit for how many Heart Containers Link can obtain in all depends on the game, though the most common maximum is twenty. Heart Containers are typically left behind by bosses upon defeat. Link can also "create" Heart Containers by collecting Pieces of Heart; the most common number of Pieces of Heart needed to complete another Heart Container is four, however, exceptions exist. Some games omit Pieces of Heart in favor of completed Heart Containers. Occasionally, Link will need a specific number of Heart Containers to complete certain tasks.
        """,
        image="https://purenintendo.com/wp-content/uploads/2012/03/LOZ_OoT_3D_HeartPiece.png",
        price=500,
        stock=5,
        created_at="Sat, 08 Jan 2022 19:24:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:24:00 GMT",
    )

    bow = Item(
        user_id=2,
        category_id=1,
        name="Ultimate Gandiva",
        description="Bard's bow in the image of a shaper of time.",
        image="https://attire.jp/wp-content/uploads/2021/09/ffxiv_20210910_012025_252.jpg",
        price=60000,
        stock=3,
        created_at="Sat, 08 Jan 2022 19:26:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:26:00 GMT",
    )

    helm = Item(
        user_id=2,
        category_id=2,
        name="Law's Order Helm of Maiming",
        description="Final Fantasy XII was a masterpiece and you can't tell me otherwise.",
        image="http://attire.jp/wp-content/uploads/2021/06/ffxiv_20210603_140940_485.png",
        price=5000,
        stock=8,
        created_at="Sat, 08 Jan 2022 19:28:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:28:00 GMT",
    )

    minion = Item(
        user_id=3,
        category_id=3,
        name="Minion of Light",
        description="Tiny explosions.",
        image="https://pbs.twimg.com/media/FHYhfHZXIAcC6aI?format=jpg&name=large",
        price=1099,
        stock=10,
        created_at="Sat, 08 Jan 2022 19:30:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:30:00 GMT",
    )

    fantasia = Item(
        user_id=1,
        category_id=5,
        name="Phial of Fantasia",
        description="It's all cat girls? Always has been.",
        image="https://onlinestore-img.finalfantasyxiv.com/onlinestore/item/2048d09293f96c8fe0ec4746a79572aed973962cf008f2b37506566ba727db1c/0000/b8fd228346654a8cee3e920c32017493f0e99cf8266b6d9e1e9b30f7ed245eab_m_detail.jpg",
        price=700,
        stock=42,
        created_at="Sat, 08 Jan 2022 19:32:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:32:00 GMT",
    )

    gunblade = Item(
        user_id=1,
        category_id=1,
        name="Squall's Gunblade Replica",
        description="Whatever.",
        image="https://assets.vg247.com/current//2017/12/Final_Fantasy_8_Gunblade.jpg",
        price=80000,
        stock=1,
        created_at="Sat, 08 Jan 2022 19:34:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:34:00 GMT",
    )

    keyblade = Item(
        user_id=4,
        category_id=1,
        name="Keyblade",
        description="Umm... I'm a little hazy on the details.",
        image="https://static.wikia.nocookie.net/kingdomhearts/images/f/f6/Kingdom_Key_KHIII.png",
        price=100000,
        stock=1,
        created_at="Sat, 08 Jan 2022 19:38:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:38:00 GMT",
    )

    magic_armor = Item(
        user_id=4,
        category_id=2,
        name="Magic Armor",
        description="Wear it and your money will become magical. The armor will protect you, so if you get hit, you lose money, not health. If you run out of money, the armor will go dormant and your movement will become impaired.",
        image="https://static.wikia.nocookie.net/zelda/images/9/90/Magic_Armor_%28Twilight_Princess%29.png",
        price=5980,
        stock=2,
        created_at="Sat, 08 Jan 2022 19:48:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:48:00 GMT",
    )

    warrior_ring = Item(
        user_id=4,
        category_id=3,
        name="Warrior's Ring",
        description="No one really knows exactly what it does, but it's probably good.",
        image="https://static.wikia.nocookie.net/dragonquest/images/9/92/DQW_-_Warrior%27s_ring.png",
        price=1500,
        stock=5,
        created_at="Sat, 08 Jan 2022 19:55:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:55:00 GMT",
    )

    lotm = Item(
        user_id=4,
        category_id=4,
        name="Lord of the Mountain",
        description="This noble creature watches over all animals that make their homes in the forest. Legends say this holy creature is a reincarnation of a sage that died on the lands it now protects. It has an acute awareness of its surroundings, so it seldom appears before people. It's sometimes known by its other name, Satori.",
        image="https://i.ytimg.com/vi/6mglXoD4vQ4/maxresdefault.jpg",
        price=999999,
        stock=1,
        created_at="Sat, 08 Jan 2022 19:50:00 GMT",
        updated_at="Sat, 08 Jan 2022 19:50:00 GMT",
    )

    medicinal_herb = Item(
        user_id=4,
        category_id=5,
        name="Medicinal Herb",
        description="Can restore a target's HP by about 30",
        image="https://static.wikia.nocookie.net/dragonquest/images/5/54/Medicinal_Herb_Item_Artwork.png",
        price=80,
        stock=40,
        created_at="Sat, 08 Jan 2022 20:00:00 GMT",
        updated_at="Sat, 08 Jan 2022 20:00:00 GMT",
    )

    db.session.add(bow)
    db.session.add(helm)
    db.session.add(minion)
    db.session.add(fantasia)
    db.session.add(gunblade)
    db.session.add(heart_container)
    db.session.add(keyblade)
    db.session.add(magic_armor)
    db.session.add(lotm)
    db.session.add(warrior_ring)
    db.session.add(medicinal_herb)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_items():
    db.session.execute("TRUNCATE items RESTART IDENTITY CASCADE;")
    db.session.commit()
