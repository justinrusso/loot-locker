from app.models import db, Category

def seed_categories():
    arms = Category(name="Arms")
    armor = Category(name="Armor")
    accessories = Category(name="Accessories")
    mounts = Category(name="Mounts")
    consumables = Category(name="Consumables")

    db.session.add(arms)
    db.session.add(armor)
    db.session.add(accessories)
    db.session.add(mounts)
    db.session.add(consumables)

    db.session.commit()

def undo_categories():
    db.session.execute("TRUNCATE categories RESTART IDENTITY CASCADE;")
    db.session.commit()
