from sqlalchemy.sql import func

from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

    category_to_item = db.relationship('CategoryToItem', back_populates="category")
